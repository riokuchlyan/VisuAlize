import yfinance as yf # type: ignore
import json
import numpy as np # type: ignore
import pandas as pd # type: ignore
from datetime import datetime

def get_time_series_data(ticker, period="1y", interval="1d"):
    stock = yf.Ticker(ticker)
    data = stock.history(period=period, interval=interval)
    return data.to_json()

def get_stock_data(ticker, start_date, end_date):
    stock = yf.Ticker(ticker)
    data = stock.history(start=start_date, end=end_date)
    return data.to_json()

def get_stock_income_statement(ticker):
    stock = yf.Ticker(ticker)
    return stock.financials.to_json()

def get_balance_sheet_data(ticker):
    stock = yf.Ticker(ticker)
    return stock.balance_sheet.to_json()

def get_cash_flow_statement(ticker):
    stock = yf.Ticker(ticker)
    return stock.cashflow.to_json()

def get_key_financial_ratios(ticker):
    stock = yf.Ticker(ticker)
    info = stock.info
    ratios = {
        "trailingPE": info.get("trailingPE"),
        "forwardPE": info.get("forwardPE"),
        "priceToBook": info.get("priceToBook"),
        "returnOnEquity": info.get("returnOnEquity"),
        "profitMargins": info.get("profitMargins"),
    }
    return json.dumps(ratios)

def get_market_data(ticker):
    stock = yf.Ticker(ticker)
    info = stock.info
    market_data = {
        "regularMarketPrice": info.get("regularMarketPrice"),
        "marketCap": info.get("marketCap"),
        "volume": info.get("volume"),
        "averageVolume": info.get("averageVolume"),
        "previousClose": info.get("previousClose"),
        "open": info.get("open"),
    }
    return json.dumps(market_data)

def get_technical_indicators(ticker):
    stock = yf.Ticker(ticker)
    data = stock.history(period="1y")
    data["SMA_20"] = data["Close"].rolling(window=20).mean()
    data["SMA_50"] = data["Close"].rolling(window=50).mean()
    delta = data["Close"].diff()
    up = delta.clip(lower=0)
    down = -delta.clip(upper=0)
    avg_gain = up.rolling(window=14).mean()
    avg_loss = down.rolling(window=14).mean()
    rs = avg_gain / avg_loss
    data["RSI_14"] = 100 - (100 / (1 + rs))
    latest = data.iloc[-1]
    indicators = {
        "SMA_20": latest["SMA_20"],
        "SMA_50": latest["SMA_50"],
        "RSI_14": latest["RSI_14"],
        "Close": latest["Close"]
    }
    return json.dumps(indicators)

def get_forecasting_data(ticker):
    stock = yf.Ticker(ticker)
    data = stock.history(period="1y").reset_index()
    x = np.array([dt.toordinal() for dt in data["Date"]])
    y = data["Close"].values
    slope, intercept = np.polyfit(x, y, 1)
    next_day = data["Date"].max() + pd.Timedelta(days=1)
    forecast_price = slope * next_day.toordinal() + intercept
    forecast = {
        "forecast_date": str(next_day.date()),
        "forecast_close": forecast_price
    }
    return json.dumps(forecast)

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

def get_date():
    return datetime.now().strftime("%Y-%m-%d")

def get_formatted_time_series(ticker, period="1mo", interval="1d"):
    stock = yf.Ticker(ticker)
    df = stock.history(period=period, interval=interval)
    df.reset_index(inplace=True)
    output = []
    for _, row in df.iterrows():
        output.append({
            "date": row["Date"].strftime("%Y-%m-%d"),
            "open": row["Open"],
            "high": row["High"],
            "low": row["Low"],
            "close": row["Close"],
            "volume": int(row["Volume"])
        })
    return json.dumps(output)

def get_moving_average_data(ticker, period="1y", interval="1d"):
    stock = yf.Ticker(ticker)
    df = stock.history(period=period, interval=interval)
    df.reset_index(inplace=True)
    df["moving_avg_50"] = df["Close"].rolling(window=50).mean()
    df["moving_avg_200"] = df["Close"].rolling(window=200).mean()
    output = []
    for _, row in df.iterrows():
        output.append({
            "date": row["Date"].strftime("%Y-%m-%d"),
            "close": row["Close"],
            "moving_avg_50": row["moving_avg_50"],
            "moving_avg_200": row["moving_avg_200"]
        })
    return json.dumps(output)
