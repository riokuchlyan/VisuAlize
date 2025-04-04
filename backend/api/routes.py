from fastapi import APIRouter # type: ignore
from pydantic import BaseModel # type: ignore
from typing import Dict
from services import fetch_data
from services import ai_analysis
from services import sentiment
import json
from fastapi.responses import PlainTextResponse

router = APIRouter()

latest_ticker = None
latest_input = None

class TickerRequest(BaseModel):
    ticker: str

class InputRequest(BaseModel):
    input: str

@router.get("/submissions")
async def get_submissions():
    return fetch_data.get_submissions(latest_ticker)

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
    return ai_analysis.get_ai_analysis(latest_ticker, latest_input)

@router.get("/filings_link", response_class=PlainTextResponse)
def get_filings():    
    return fetch_data.get_filings_link(latest_ticker)

@router.get("/basic_data")
def basic_data():
    return fetch_data.get_basic_data(latest_ticker)

@router.get("/sentiment")
def get_sentiment():
    return sentiment.getPrediction(latest_ticker)

@router.get("/technicals")
def get_technicals():
    return ai_analysis.get_ai_analysis_technicals(latest_ticker)

@router.get("/valuation")
def get_valuation():
    return ai_analysis.get_ai_analysis_valuation(latest_ticker)

@router.get("/stock_data")
def stock_data():
    data = fetch_data.get_stock_data(latest_ticker)
    return json.loads(data)

@router.get("/news")
def get_news():
    data = fetch_data.get_news_data(latest_ticker)
    return json.loads(data)