# -*- coding: utf-8 -*-
"""
Created on Mon Oct 19 14:06:04 2020

@author: ASUS
"""


#!/usr/bin/env python3
#-*- coding: utf-8 -*-

# import the pymongo library
import pymongo
import json
with open("C:/Users/ASUS/Desktop/SCERTIF scrapping/certif_names/providers/results.json") as file:
    data = json.load(file)
# create a client instance with explicitly passed host parameter

client = pymongo.MongoClient("mongodb://scertif:scertif@cluster0-shard-00-00.eur5w.mongodb.net:27017,cluster0-shard-00-01.eur5w.mongodb.net:27017,cluster0-shard-00-02.eur5w.mongodb.net:27017/scertif?ssl=true&replicaSet=atlas-zeeb6s-shard-0&authSource=admin&retryWrites=true&w=majority")
db = client.scertif


# create a collection object that will be
# used to call 'insert' methods
col = db["exams"]




s=0
for i in data:
    # call the 'insert_one()' method to insert a doc
    result = col.insert_one(i).inserted_id
    s+=1
