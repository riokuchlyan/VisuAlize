from fastapi import APIRouter
from pydantic import BaseModel
from typing import Dict
from services import fetch_data

router = APIRouter()

latest_ticker = None

class TickerRequest(BaseModel):
    ticker: str

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

@router.get("/basic_data")
def basic_data():
    return fetch_data.get_basic_data(latest_ticker)