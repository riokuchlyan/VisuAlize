from textblob import TextBlob
from api.news_api import getNews

def getSentiment(text):
    return TextBlob(getNews(text)).sentiment.polarity

def getPrediction(text):
    sentiment=getSentiment(text)
    if sentiment <= 0.1 and sentiment >= -0.1:
        return "Not enough reliable data to make a prediction."
    elif sentiment < 0 and sentiment > -0.2:
        return "Slightly low sentiment: Confidence: low"
    elif sentiment <= -0.2 and sentiment > -0.5:
        return "Low sentiment: Confidence: medium"
    elif sentiment <= -0.5:
        return "Very low sentiment: Confidence: high"
    elif sentiment > 0 and sentiment < 0.2:
        return "Slightly high sentiment: Confidence: low"
    elif sentiment >= 0.2 and sentiment < 0.5:
        return "High sentiment: Confidence: medium"
    elif sentiment >= 0.5:
        return "Very high sentiment: Confidence: high"