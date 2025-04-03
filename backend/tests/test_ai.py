from services import fetch_data
from api import ai_api

def test_get_ai_analysis(ticker: str, input_text: str):
    return ai_api.get_ai_response(fetch_data.get_basic_data(ticker), input_text)

def test_get_ai_analysis_technicals(ticker: str):
    return ai_api.get_ai_response_technicals(fetch_data.get_basic_data(ticker))

def test_get_ai_analysis_valuation(ticker: str):
    return ai_api.get_ai_response_valuation(fetch_data.get_basic_data(ticker))