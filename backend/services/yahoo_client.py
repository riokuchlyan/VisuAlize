# internal

# external
import yfinance as yf

# built-in
import json

def get_basic_stock_data(ticker: str) -> str:
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

def get_stock_data(ticker: str, period: str = "1mo") -> list[dict]:
    stock = yf.Ticker(ticker)
    hist = stock.history(period=period)
    data = hist[['Close']].reset_index()
    data['Date'] = data['Date'].astype(str) 
    return data.to_dict(orient="records")

def save_close_values_to_json(ticker: str, period: str = "1mo", interval: str = "1d") -> str:
    stock = yf.Ticker(ticker)
    df = stock.history(period=period, interval=interval)
    df.reset_index(inplace=True)
    data = []
    for _, row in df.iterrows():
        data.append({
            "date": row["Date"].strftime("%Y-%m-%d"),
            "close": round(row["Close"], 2)
        })
    return json.dumps(data)