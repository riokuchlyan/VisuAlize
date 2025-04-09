# internal
from services import news_client
from services import openai_client
from services import sentiment
from services import yahoo_client
from utils.get_cik import get_CIK
from utils.text_to_audio import text_to_audio
from services import sec_client

# external

# built-in

def handle_get_ai_analysis(ticker: str, input_text: str):
    return openai_client.get_ai_response(handle_get_basic_data(ticker), input_text)

def handle_get_ai_analysis_technicals(ticker: str):
    return openai_client.get_ai_response_technicals(handle_get_basic_data(ticker))

def handle_get_ai_analysis_valuation(ticker: str):
    return openai_client.get_ai_response_valuation(handle_get_basic_data(ticker))

def handle_get_sentiment(ticker: str):
    return sentiment.get_prediction(ticker)

def handle_text_to_audio(text: str):
    return text_to_audio(text)

def handle_get_basic_data(ticker: str):
    return yahoo_client.get_basic_stock_data(ticker)

def handle_get_stock_data(ticker: str):
    return yahoo_client.get_stock_data(ticker)

def handle_get_submissions(ticker: str):
    return sec_client.get_submissions(ticker)

def handle_get_filings_link(ticker: str):
    return f'https://www.sec.gov/edgar/browse/?CIK={get_CIK(ticker)}'

def handle_get_news_data(ticker: str):
    return news_client.get_news(ticker)

def handle_get_ai_analysis_summary(ticker: str):
    return openai_client.get_ai_response_summary(handle_get_basic_data(ticker))