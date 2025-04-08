# internal
from services.news_client import get_news
from utils.sentiment_logic import sentiment_logic

# external
from textblob import TextBlob

# built-in

def get_polarity(text):
    return TextBlob(get_news(text)).sentiment.polarity

def get_prediction(text):
    polarity=get_polarity(text)
    return sentiment_logic(polarity)