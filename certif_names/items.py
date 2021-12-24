# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class CertifItem(scrapy.Item):
    # define the fields for your item here like:
    certifName = scrapy.Field()
    version = scrapy.Field()
    question_answers = scrapy.Field()
    rightAnswer = scrapy.Field()




