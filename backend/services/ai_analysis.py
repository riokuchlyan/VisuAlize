from services import fetch_data
from api import ai_api

def get_ai_analysis(ticker: str, input_text: str):
    return ai_api.get_ai_response(fetch_data.get_basic_data(ticker), input_text)

def get_ai_analysis_technicals(ticker: str):
    return ai_api.get_ai_response(fetch_data.get_basic_data(ticker))

def get_ai_analysis_valuation(ticker: str):
    return ai_api.get_ai_response(fetch_data.get_basic_data(ticker))