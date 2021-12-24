from gensim.summarization import keywords
import json
with open("C:/Users/ASUS/Desktop/SCERTIF scrapping/certif_names/providers/results.json") as file:
    data = json.load(file)
def addtolist(list1,list2):
    for i in list2:
        if i not in list1:
            list1.append(i)
    return list1
f = open("C:/Users/ASUS/Desktop/linked-eed-master/data.txt", "r",encoding="utf8")
keywordslist=f.readlines()
def getKeywords(exam):
    listKeywords=[]
    listKeywords=addtolist(listKeywords, keywords(exam['provider'],lemmatize=True).split('\n'))
    listKeywords=addtolist(listKeywords, keywords(exam['exam'],lemmatize=True).split('\n'))
    for i in exam['questions']:
        listKeywords=addtolist(listKeywords, keywords(i['question'],lemmatize=True).split('\n'))
        for j in i['choices']:
            listKeywords=addtolist(listKeywords, keywords(j,lemmatize=True).split('\n'))
    l2=[]
    for i in keywordslist:
        if i.replace('\n','').lower() in listKeywords:
            l2.append(i)
    return l2

s=0
for i in data:
    i['tags']=getKeywords(i)
    s+=1
    print(str(round((s/len(data))*100))+'%')







# #define Jaccard Similarity function
# def jaccard(list1, list2):
#     intersection = len(list(set(list1).intersection(list2)))
#     union = (len(list1) + len(list2)) - intersection
#     return float(intersection) / union

# #find Jaccard Similarity between the two sets
# for i in words:
#     jaccard(words[0].split(), keywords)







