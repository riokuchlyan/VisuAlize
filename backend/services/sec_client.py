# internal
from utils.get_cik import get_CIK

# external
import requests

# built-in

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}

def get_submissions(ticker: str) -> dict:
    try:
        headers = HEADERS
        CIK = get_CIK(ticker)
        url = f"https://data.sec.gov/submissions/CIK{CIK}.json"
        
        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            return response.json()  
        else:
            return {"error": f"Failed to fetch data, status code: {response.status_code}"}
    
    except Exception as e:
        return {"error": str(e)} 
    
def get_company_concept(ticker: str) -> dict:
    try:
        headers = HEADERS
        CIK = get_CIK(ticker)
        url = f"https://data.sec.gov/api/xbrl/companyconcept/CIK{CIK}/us-gaap/AccountsPayableCurrent.json"
        
        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            return response.json()  
        else:
            return {"error": f"Failed to fetch data, status code: {response.status_code}"}
    
    except Exception as e:
        return {"error": str(e)} 
    
def get_company_facts(ticker: str) -> dict:
    try:
        headers = HEADERS
        CIK = get_CIK(ticker)
        url = f"https://data.sec.gov/api/xbrl/companyfacts/CIK{CIK}.json"
        
        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            return response.json()  
        else:
            return {"error": f"Failed to fetch data, status code: {response.status_code}"}
    
    except Exception as e:
        return {"error": str(e)} 