import json
import re

TAG_RE = re.compile(r'<[^>]+>')

def remove_tags(text):
    return TAG_RE.sub('', text)

with open("C:/Users/ASUS/Desktop/SCERTIF scrapping/certif_names/providers/results.json") as file:
    data = json.load(file)
for i in data:
    if 'question_answers' not in i.keys():
        data.remove(i)
for i in data:
    test = False
    for j in i['question_answers']:
        if ('Click the Exhibit' in j) or (len(i['question_answers'])<=3 and  'A.' not in j):
            test = True
    if test:
        data.remove(i)
for i in data:
    if 'version' not in i.keys():
        data.remove(i)
def getExhibit(value):
    if 'a href' in value:
        if 'png' in value:
            return value[value.index("a href")+8:value.index("png")+3]
        elif 'jpeg' in value:
            return value[value.index("a href")+8:value.index("jpeg")+3]
        elif 'jpg' in value:
            return value[value.index("a href")+8:value.index("jpg")+3]
    else:
        return None
data[0].keys()

for i in data:
    for j in i['question_answers'][:2:]:
        if 'uploads' in j:
            i['Exhibit']=getExhibit(j)

    s=i['certifName'][0]
    if 'Questions' in s:
        certifName=s[:s.index('Questions')]
        i['certifName']=remove_tags(certifName)
    else:
        i['certifName']=s
    if 'version' in i.keys():
        i['version']=remove_tags(i['version'][0])
    if not('rightAnswer' in i.keys()):
        l=[]
        for j in i['question_answers']:
            if '</font>' in j:
                l.append(remove_tags(j))
        i['rightAnswer']=l
    else:
        l=[]
        for j in i['rightAnswer']:
            l.append(remove_tags(j))
        i['rightAnswer']=l
    l=[]
    for j in i['question_answers']:
        l.append(remove_tags(j))
    i['question_answers']=l
    d={}
    l1=[]
    l2=[]
    s=' '
    for j in i['question_answers']:
        if j.startswith('A.') or j.startswith('B.') or j.startswith('C.') or j.startswith('D.') or j.startswith('E.'):
            l1.append(j)
        else:
            l2.append(j)
    d['question']=s.join(l2)
    d['answers']=l1
    i['question_answers']=d
dataset={}
for i in data:
    if i['certifName'] not in l:
        dataset[i['certifName']]=0

for i in data:
    dataset[i['certifName']]=dataset[i['certifName']]+1
for i in data:
    if dataset[i['certifName']]<30:
        data.remove(i)

dataf=[]
for i in data:

    if {'provider':i['certifName'],'exam':i['version']} not in dataf:
        dataf.append({'provider':i['certifName'],'exam':i['version']})

for i in dataf:
    l=[]
    for k in data:
        if k['version'] == i['exam']:
            if k['question_answers']['question'] not in [q['question'] for q in l]:
                if 'Exhibit' in k.keys():
                    l.append({
                            'question':k['question_answers']['question'],
                            'choices':k['question_answers']['answers'],
                            'correctAnswers':k['rightAnswer'],
                            'Exhibit':k['Exhibit']
                            })
                else:
                    l.append({
                            'question':k['question_answers']['question'],
                            'choices':k['question_answers']['answers'],
                            'correctAnswers':k['rightAnswer'],
                            })
    i['questions']=l




for i in dataf:
    for j in i['exams']:
        l=[]
        for k in data:
            if k['version'] == j['name']:
                if k['question_answers']['question'] not in [q['question'] for q in j['questions']]:
                    if 'Exhibit' in k.keys():
                        l.append({
                            'question':k['question_answers']['question'],
                            'choices':k['question_answers']['answers'],
                            'correctAnswers':k['rightAnswer'],
                            'Exhibit':k['Exhibit']
                            })
                    else:
                        l.append({
                            'question':k['question_answers']['question'],
                            'choices':k['question_answers']['answers'],
                            'correctAnswers':k['rightAnswer'],
                            })
        j['questions']=l




with open('C:/Users/ASUS/Desktop/SCERTIF scrapping/certif_names/providers/results.json', 'w') as outfile:
    json.dump(dataf, outfile)