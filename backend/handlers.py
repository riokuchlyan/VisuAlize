# internal
from services import fetch_data
from backend.services import openai_client
from services.sentiment import get_prediction
from backend.services import yahoo_client
from utils.get_cik import getCIK
from api import sec_api, news_api

# external

# built-in

def handle_get_ai_analysis(ticker: str, input_text: str):
    return openai_client.get_ai_response(fetch_data.get_basic_data(ticker), input_text)

def handle_get_ai_analysis_technicals(ticker: str):
    return openai_client.get_ai_response_technicals(fetch_data.get_basic_data(ticker))

def handle_get_ai_analysis_valuation(ticker: str):
    return openai_client.get_ai_response_valuation(fetch_data.get_basic_data(ticker))

def handle_get_sentiment(ticker: str):
    return get_prediction(ticker)

def handle_get_basic_data(ticker: str):
    return yahoo_client.get_basic_stock_data(ticker)

def handle_get_submissions(ticker: str):
    return sec_api.get_submissions(ticker)

def handle_get_all_data(ticker: str):
    return yahoo_client.get_all_company_data(ticker)

def handle_get_filings_link(ticker: str):
    return f'https://www.sec.gov/edgar/browse/?CIK={getCIK(ticker)}'

def handle_get_stock_data(ticker: str):
    return yahoo_client.save_close_values_to_json(ticker)

def handle_get_news_data(ticker: str):
    return news_api.getNews(ticker)