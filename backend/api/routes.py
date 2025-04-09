# internal
from handlers import *

# external
from fastapi import APIRouter 
from pydantic import BaseModel 
from typing import Dict, Any
from fastapi.responses import PlainTextResponse
from fastapi.responses import JSONResponse

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
async def get_submissions() -> Any:
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
def get_analysis() -> str:
    return handle_get_ai_analysis(latest_ticker, latest_input)

@router.get("/filings_link", response_class=PlainTextResponse)
def get_filings() -> str:    
    return handle_get_filings_link(latest_ticker)

@router.get("/basic_data")
def basic_data() -> str:
    return handle_get_basic_data(latest_ticker)

@router.get("/sentiment")
def get_sentiment() -> str:
    return handle_get_sentiment(latest_ticker)

@router.get("/audio_summary")
def get_audio_summary() -> str:
    data = handle_get_ai_analysis_summary(latest_ticker)
    encoded_audio = handle_text_to_audio(data)
    audio_data_url = f"data:audio/mp3;base64,{encoded_audio}"
    return audio_data_url

@router.get("/summary")
def get_summary() -> JSONResponse:
    data = handle_get_ai_analysis_summary(latest_ticker)
    return JSONResponse(content={"summary": data})

@router.get("/technicals")
def get_technicals() -> str:
    return handle_get_ai_analysis_technicals(latest_ticker)

@router.get("/valuation")
def get_valuation() -> str:
    return handle_get_ai_analysis_valuation(latest_ticker)

@router.get("/stock_data")
def stock_data() -> Any:
    data = handle_get_stock_data(latest_ticker)
    return json.loads(data)

@router.get("/news")
def get_news() -> Any:
    data = handle_get_news_data(latest_ticker)
    return json.loads(data)