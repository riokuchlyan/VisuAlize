from fastapi import FastAPI
from utils import sec_api
from pydantic import BaseModel
from typing import Dict
from fastapi.middleware.cors import CORSMiddleware
from utils import yahoo_api
import openai


openai.api_key = ("OPENAI_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

latest_ticker = None

@app.get("/")
async def root():
    return {"message": "Welcome to the VisuAlize backend"}

@app.get("/submissions")
async def get_submissions():
    return sec_api.get_company_concept(latest_ticker)

class TickerRequest(BaseModel):
    ticker: str

@app.post("/ticker")
def predict(request: TickerRequest) -> Dict[str, str]:
    global latest_ticker 
    latest_ticker = request.ticker  
    return {"ticker": latest_ticker}

@app.get("/latest_ticker")
def get_latest_ticker() -> Dict[str, str]:
    if latest_ticker:
        return {"latest_ticker": latest_ticker}
    return {"error": "No ticker submitted"}

@app.get("/market_data")
def market_data():
    return yahoo_api.get_market_data(latest_ticker)

@app.get("/basic_data")
def basic_data():
    return yahoo_api.get_basic_stock_data(latest_ticker)