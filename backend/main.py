from fastapi import FastAPI
from utils import sec_api

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Welcome to the FastAPI backend"}

@app.get("/submissions/{ticker}")
async def get_submissions(ticker: str):
    return sec_api.get_company_concept(ticker)

@app.get("/test")
async def test(ticker: str):
    print(f"Received ticker: {ticker}")
    return sec_api.get_company_concept(ticker)