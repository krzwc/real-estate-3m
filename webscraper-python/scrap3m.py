from urllib.request import urlopen
from bs4 import BeautifulSoup
import re
import math
import ssl
import json
import contextlib
import time

def fetch_url(my_url):
    with contextlib.closing(urlopen(my_url, context=ssl.SSLContext())) as fetch_url:
        page_html = fetch_url.read()
        fetch_url.close()
        soup_page = BeautifulSoup(page_html, "html.parser")
    return soup_page

def scrap3m(soup_page):
    ads = soup_page.findAll("div", {"class": "ogl-item"})
    addArr = []
    for ad in ads:
        addArrObj = {}
        addArrObj['id'] = ad['data-id']
        addArrObj['url'] = ad.div.a.get('href')
        # remove redundant spaces and \n after city name
        addArrObj['loc'] = re.sub('\n', '', re.sub(' +',' ',ad.div.div.div.p.text)).strip()
        price_to_parse = ad.findAll("div", {"class":"prize"})
        for price in price_to_parse:
            addArrObj['price'] = re.sub('\n', '', re.sub(' +',' ',price.text)).strip()
        area_to_parse = ad.findAll("div", {"class":"text-wrap"})
        # for area in area_to_parse:
        for area in area_to_parse:
            details = area.ul.findAll("li")
            idx = 0
            if idx < len(details):
                addArrObj['rooms'] = details[idx].text.strip()
            idx +=1
            if idx < len(details):
                addArrObj['m2'] = details[idx].text.strip()
            else:
                addArrObj['m2'] = ""
            idx += 1
            if idx < len(details):
                addArrObj['floor'] = details[idx].text.strip()
            else:
                addArrObj['floor'] = ""
        addArr.append(addArrObj)
    # print(addArr)
    return addArr


if __name__ == '__main__':
    url_base = r'https://dom.trojmiasto.pl/nieruchomosci-rynek-wtorny/ikl,101,e1i,33_97_83_96_76_2,qi,42_55.html?strona='
    #suffix
    soup_page = fetch_url(url_base+str(0))

    #how many offers totally
    total_to_parse = soup_page.findAll("div", {"class": "navi-bar"})
    #extract total number of offers for the scraped string, convert to int and calculate the total number of offers (10 results per page)
    total = math.ceil([int(s) for s in total_to_parse[0].text.split() if s.isdigit()][0]/10)-1

    allAddArr = {}
    allAddArr['data'] = []

    #use total instead of hardcoded range value for all ads
    for i in range(1):
        print(i)
        soup_page = fetch_url(url_base + str(i))
        allAddArr['data'] += scrap3m(soup_page)
        time.sleep(5)

    # print(allAddArr)

    with open('scrap3m.json', 'w') as outfile:
        json.dump(allAddArr, outfile)

    with open('scrap3m.json') as json_data:
        jsonData = json.load(json_data)

    for i in jsonData:
        print(i)