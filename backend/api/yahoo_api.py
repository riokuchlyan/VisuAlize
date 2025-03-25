import yfinance as yf
import json
import numpy as np
import pandas as pd
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

def get_all_company_data(ticker):
    try:
        result = {}

        try:
            result["basic_data"] = json.loads(get_basic_stock_data(ticker))
        except Exception as e:
            result["basic_data"] = "Error: " + str(e)

        try:
            result["time_series_data"] = json.loads(get_time_series_data(ticker))
        except Exception as e:
            result["time_series_data"] = "Error: " + str(e)

        try:
            result["income_statement"] = json.loads(get_stock_income_statement(ticker))
        except Exception as e:
            result["income_statement"] = "Error: " + str(e)

        try:
            result["balance_sheet"] = json.loads(get_balance_sheet_data(ticker))
        except Exception as e:
            result["balance_sheet"] = "Error: " + str(e)

        try:
            result["cash_flow"] = json.loads(get_cash_flow_statement(ticker))
        except Exception as e:
            result["cash_flow"] = "Error: " + str(e)

        try:
            result["financial_ratios"] = json.loads(get_key_financial_ratios(ticker))
        except Exception as e:
            result["financial_ratios"] = "Error: " + str(e)

        try:
            result["market_data"] = json.loads(get_market_data(ticker))
        except Exception as e:
            result["market_data"] = "Error: " + str(e)

        try:
            result["technical_indicators"] = json.loads(get_technical_indicators(ticker))
        except Exception as e:
            result["technical_indicators"] = "Error: " + str(e)

        try:
            result["forecasting_data"] = json.loads(get_forecasting_data(ticker))
        except Exception as e:
            result["forecasting_data"] = "Error: " + str(e)

        try:
            result["formatted_time_series"] = json.loads(get_formatted_time_series(ticker))
        except Exception as e:
            result["formatted_time_series"] = "Error: " + str(e)

        try:
            result["moving_average_data"] = json.loads(get_moving_average_data(ticker))
        except Exception as e:
            result["moving_average_data"] = "Error: " + str(e)

        try:
            result["current_date"] = get_date()
        except Exception as e:
            result["current_date"] = "Error: " + str(e)

        try:
            stock = yf.Ticker(ticker)
        except Exception as e:
            stock = None
            result["ticker_error"] = "Error initializing ticker: " + str(e)

        if stock is not None:
            try:
                dividends = stock.dividends.to_dict() if stock.dividends is not None else {}
                result["dividends"] = dividends
            except Exception as e:
                result["dividends"] = "Error: " + str(e)

            try:
                splits = stock.splits.to_dict() if stock.splits is not None else {}
                result["splits"] = splits
            except Exception as e:
                result["splits"] = "Error: " + str(e)

            try:
                if stock.recommendations is not None:
                    recommendations = stock.recommendations.reset_index().to_dict(orient="list")
                else:
                    recommendations = {}
                result["recommendations"] = recommendations
            except Exception as e:
                result["recommendations"] = "Error: " + str(e)
        else:
            result["dividends"] = "Ticker initialization failed."
            result["splits"] = "Ticker initialization failed."
            result["earnings_history"] = "Ticker initialization failed."
            result["recommendations"] = "Ticker initialization failed."

        return json.dumps(result)
    except Exception as e:
        return "Error retrieving company data: " + str(e)