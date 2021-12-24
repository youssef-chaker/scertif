# -*- coding: utf-8 -*-
"""
Created on Thu Nov 19 11:52:42 2020

@author: ASUS
"""
from flask import Flask, jsonify
from flask_cors import CORS

import json
with open("results.json",encoding="utf8") as file:
    data = json.load(file)
#define Jaccard Similarity function
def jaccard(list1, list2):
    intersection = len(list(set(list1).intersection(list2)))
    union = (len(list1) + len(list2)) - intersection
    return float(intersection) / union
app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*","supports_credentials":True}})


@app.route('/api/similarExams/<string:examName>')
def getSimilarExams(examName):
    result=[]
    exam={}
    for i in data:
        if i['exam'] == examName:
            exam=i
            break
    for i in data:
        if i['exam'] != exam['exam']:
            result.append({"exam":i,"similarity":jaccard(i['tags'], exam['tags'])})
    result=sorted(result, key = lambda i: i['similarity'],reverse=True)
    return jsonify(result[:4])



@app.route('/api/jobs/exam/<string:examName>')
def getJobs(examName):

    return jsonify()



@app.route('/api/exam/job/<string:jobName>')
def getExamForJob(jobName):

    return jsonify()




if __name__ == '__main__':
    app.run(port=5005)
