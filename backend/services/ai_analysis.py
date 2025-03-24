from services import fetch_data
from api import openai_api

def get_ai_analysis(ticker, input_text):
    return openai_api.get_ai_response(fetch_data.get_submissions(ticker), input_text)