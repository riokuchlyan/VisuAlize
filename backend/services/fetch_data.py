from api import sec_api, yahoo_api
from utils.get_cik import getCIK

def get_basic_data(ticker: str):
    return yahoo_api.get_basic_stock_data(ticker)

def get_submissions(ticker: str):
    return sec_api.get_submissions(ticker)

def get_all_data(ticker: str):
    return yahoo_api.get_all_company_data(ticker)

def get_filings_link(ticker: str):
    return f'https://www.sec.gov/edgar/browse/?CIK={getCIK(ticker)}'

def get_stock_data(ticker: str):
    return yahoo_api.get_stock_data(ticker)