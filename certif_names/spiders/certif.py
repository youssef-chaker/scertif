# -*- coding: utf-8 -*-
"""
Created on Sun Oct  4 13:42:47 2020

@author: ASUS
"""


import scrapy
from scrapy.loader import ItemLoader
from certif_names.items import CertifItem

class CertifSpider(scrapy.Spider):
    name ='certifnames'

    start_urls = [
            'https://www.briefmenow.org'
        ]
    def parse(self,response):
        for c in response.xpath("//div[@class='post-content']"):
            links = c.xpath(".//ul/li/h3/a/@href").getall()
            for l in links:
                yield scrapy.Request(l, callback=self.parse_product)

    def parse_product(self,response):
        versionLinks=response.xpath("//div[@class='content']/ul/li/span/a/@href").getall()
        for l in versionLinks:
            yield scrapy.Request(l, callback=self.parse_version)
    def parse_version(self,response):
        l=response.xpath("//footer[@class='entry-meta']/a/@href").extract_first()
        return scrapy.Request(l, callback=self.parse_questions)
    def parse_questions(self,response):
        l=response.xpath("//div[@class='nav-next']/a/@href").extract_first()
        certifname=response.xpath("//div[@class='dp_breadcrumb_main']/span/a[@class='dp_breadcrumb_a_home']/text()").extract_first()
        version = response.xpath("//div[@class='dp_breadcrumb_main']/span/a[@class='dp_breadcrumb_a_1 dp_breadcrumb_a_last']/text()").extract_first()
        question_answers = response.xpath("//div[@class='entry-content']/p").getall()
        rightAnswer = response.xpath("//div[@class='entry-content']/p[@class='rightAnswer']").getall()
        item = CertifItem()
        loader = ItemLoader(item=item,response=response)
        loader.add_value('certifName', certifname)
        loader.add_value('version', version)
        loader.add_value('question_answers', question_answers)
        loader.add_value('rightAnswer', rightAnswer)
        yield loader.load_item()
        if l is not None:
            l1=response.urljoin(l)
            yield scrapy.Request(l1, callback=self.parse_questions)






