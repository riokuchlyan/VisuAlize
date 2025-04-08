# internal
from backend.services.news_client import getNews
from utils.sentiment_logic import sentiment_logic

# external
from textblob import TextBlob

# built-in

def get_polarity(text):
    return TextBlob(getNews(text)).sentiment.polarity

def get_prediction(text):
    polarity=get_polarity(text)
    return sentiment_logic(polarity)