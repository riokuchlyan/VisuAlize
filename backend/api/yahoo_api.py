# internal

# external
import yfinance as yf 
import numpy as np
import pandas as pd 

# built-in
import json
from datetime import datetime

def get_basic_stock_data(ticker):
    stock = yf.Ticker(ticker)
    info = stock.info
    basic_data = {
        "symbol": info.get("symbol"),
        "shortName": info.get("shortName"),
        "longName": info.get("longName"),
        "sector": info.get("sector"),
        "industry": info.get("industry"),
        "currency": info.get("currency"),
        "regularMarketPrice": info.get("regularMarketPrice"),
        "marketCap": info.get("marketCap"),
        "volume": info.get("volume"),
        "dailyHigh": info.get("regularMarketDayHigh"),
        "dailyLow": info.get("regularMarketDayLow")
    }
    return json.dumps(basic_data)

def get_stock_data(ticker, period="1mo"):
    stock = yf.Ticker(ticker)
    hist = stock.history(period=period)
    data = hist[['Close']].reset_index()
    data['Date'] = data['Date'].astype(str) 
    return data.to_dict(orient="records")