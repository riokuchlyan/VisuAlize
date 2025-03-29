import requests
import datetime
import json
import os
from dotenv import load_dotenv # type: ignore

load_dotenv()

#initiate newsapi.org API
url = 'https://newsapi.org/v2/everything?'

def getNews(query):
    parameters = {
        'q': str(query), # query phrase
        'pageSize': 100,  # maximum is 100
        'apiKey': os.getenv("NEWS_API_KEY") # your own API key
    }
    response = requests.get(url, params=parameters)
    response_json = response.json()
    return json.dumps(response_json)