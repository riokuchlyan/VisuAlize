from api import sec_api, yahoo_api

def get_basic_data(ticker: str):
    return yahoo_api.get_basic_stock_data(ticker)

def get_submissions(ticker: str):
    return sec_api.get_submissions(ticker)