# internal
from handlers import *

# external
from fastapi import APIRouter 
from pydantic import BaseModel 
from typing import Dict
from fastapi.responses import PlainTextResponse

# built-in
import json

router = APIRouter()

latest_ticker = None
latest_input = None

class TickerRequest(BaseModel):
    ticker: str

class InputRequest(BaseModel):
    input: str

@router.get("/submissions")
async def get_submissions():
    return handle_get_submissions(latest_ticker)

@router.post("/ticker")
def predict(request: TickerRequest) -> Dict[str, str]:
    global latest_ticker
    latest_ticker = request.ticker  
    return {"ticker": latest_ticker}

@router.get("/latest_ticker")
def get_latest_ticker() -> Dict[str, str]:
    if latest_ticker:
        return {"latest_ticker": latest_ticker}
    return {"error": "No ticker submitted"}

@router.post("/input")
def predict(request: InputRequest) -> Dict[str, str]:
    global latest_input
    latest_input = request.input
    return {"input": latest_input}

@router.get("/latest_input")
def get_latest_input() -> Dict[str, str]:
    if latest_input:
        return {"latest_input": latest_input}
    return {"error": "No input submitted"}

@router.get("/ai_analysis")
def get_analysis():
    return handle_get_ai_analysis(latest_ticker, latest_input)

@router.get("/filings_link", response_class=PlainTextResponse)
def get_filings():    
    return handle_get_filings_link(latest_ticker)

@router.get("/basic_data")
def basic_data():
    return handle_get_basic_data(latest_ticker)

@router.get("/sentiment")
def get_sentiment():
    return handle_get_sentiment(latest_ticker)

@router.get("/technicals")
def get_technicals():
    return handle_get_ai_analysis_technicals(latest_ticker)

@router.get("/valuation")
def get_valuation():
    return handle_get_ai_analysis_valuation(latest_ticker)

@router.get("/stock_data")
def stock_data():
    data = handle_get_stock_data(latest_ticker)
    return json.loads(data)

@router.get("/news")
def get_news():
    data = handle_get_news_data(latest_ticker)
    return json.loads(data)