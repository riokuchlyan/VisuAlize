# internal
from services import fetch_data
from backend.services import openai_client

# external

# built-in

def test_get_ai_analysis(ticker: str, input_text: str) -> str:
    return openai_client.get_ai_response(fetch_data.get_basic_data(ticker), input_text)

def test_get_ai_analysis_technicals(ticker: str) -> str:
    return openai_client.get_ai_response_technicals(fetch_data.get_basic_data(ticker))

def test_get_ai_analysis_valuation(ticker: str) -> str:
    return openai_client.get_ai_response_valuation(fetch_data.get_basic_data(ticker))