# internal
from config import OPEN_AI_KEY, NEWS_API_KEY
from services import fetch_data
from backend.services import openai_client

# external

# built-in

def handle_get_ai_analysis(ticker: str, input_text: str):
    return openai_client.get_ai_response(fetch_data.get_basic_data(ticker), input_text)

def handle_get_ai_analysis_technicals(ticker: str):
    return openai_client.get_ai_response_technicals(fetch_data.get_basic_data(ticker))

def handle_get_ai_analysis_valuation(ticker: str):
    return openai_client.get_ai_response_valuation(fetch_data.get_basic_data(ticker))