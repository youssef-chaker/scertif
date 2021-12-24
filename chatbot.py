from flask import Flask, jsonify
from flask_cors import CORS
import requests
import nltk
import json
from nltk.stem.lancaster import LancasterStemmer
stemmer = LancasterStemmer()

import numpy
import tflearn
import tensorflow
import random
app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
with open("results.json",encoding="utf8") as file:
		exams = json.load(file)
with open("intents2.json") as file:
		data = json.load(file)
		words = []
		labels = []
		docs_x = []
		docs_y = []

		for intent in data["intents"]:
			for pattern in intent["patterns"]:
				wrds = nltk.word_tokenize(pattern)
				words.extend(wrds)
				docs_x.append(wrds)
				docs_y.append(intent["tag"])

			if intent["tag"] not in labels:
				labels.append(intent["tag"])

		words = [stemmer.stem(w.lower()) for w in words if w != "?"]
		words = sorted(list(set(words)))

		labels = sorted(labels)

		training = []
		output = []

		out_empty = [0 for _ in range(len(labels))]

		for x, doc in enumerate(docs_x):
			bag = []

			wrds = [stemmer.stem(w.lower()) for w in doc]

			for w in words:
				if w in wrds:
					bag.append(1)
				else:
					bag.append(0)

			output_row = out_empty[:]
			output_row[labels.index(docs_y[x])] = 1

			training.append(bag)
			output.append(output_row)


		training = numpy.array(training)
		output = numpy.array(output)

def bag_of_words(s, words):
    bag = [0 for _ in range(len(words))]

    s_words = nltk.word_tokenize(s)
    s_words = [stemmer.stem(word.lower()) for word in s_words]

    for se in s_words:
        for i, w in enumerate(words):
            if w == se:
                bag[i] = 1

    return numpy.array(bag)
@app.route('/api/chatbot/train')
def chatbot_train():
		tensorflow.reset_default_graph()

		net = tflearn.input_data(shape=[None, len(training[0])])
		net = tflearn.fully_connected(net, 8)
		net = tflearn.fully_connected(net, 8)
		net = tflearn.fully_connected(net, len(output[0]), activation="softmax")
		net = tflearn.regression(net)


		model = tflearn.DNN(net)
		model.fit(training, output, n_epoch=1000, batch_size=8, show_metric=True)
		model.save("model.tflearn")
		dic={}
		dic['responce']='trained'
		return jsonify(dic)

@app.route('/api/chatbot/<string:message>')
def chatbot(message):
		tensorflow.reset_default_graph()
		net = tflearn.input_data(shape=[None, len(training[0])])
		net = tflearn.fully_connected(net, 8)
		net = tflearn.fully_connected(net, 8)
		net = tflearn.fully_connected(net, len(output[0]), activation="softmax")
		net = tflearn.regression(net)
		model = tflearn.DNN(net)
		model.load('model.tflearn')
		inp = message
		ch = ''
		results = model.predict([bag_of_words(inp, words)])
		results_index = numpy.argmax(results)
		res = numpy.max(results)
		tag = labels[results_index]
		for tg in data["intents"]:
			if tg['tag'] == tag:
				responses = tg['responses']
				ch = random.choice(responses)
		return jsonify({'message':ch})
@app.route('/api/chatbot/question/<string:message>')
def question(message):
	for i in exams:
		for j in i['questions']:
			if message == j['question']:
				return jsonify(j)
	return jsonify({'message':"not found"})
if __name__ == '__main__':
    app.run(port=5006)
