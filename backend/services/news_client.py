# internal
from config import NEWS_API_KEY

# external
import requests

# built-in
import json
import os
import re


url = 'https://newsapi.org/v2/everything?'

def get_news(query):
    parameters = {
        'q': str(query),
        'pageSize': 100,
        'apiKey': NEWS_API_KEY
    }
    response = requests.get(url, params=parameters)
    response_json = response.json()
    articles = response_json.get("articles", [])
    
    cleaned_titles = []
    for article in articles:
        title = article.get("title", "")
        clean_title = re.sub(r'[^A-Za-z\s]', '', title)
        clean_title = ' '.join(clean_title.split())
        cleaned_titles.append(clean_title)
    json_news = json.dumps(cleaned_titles)
    return json_news