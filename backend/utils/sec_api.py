import requests
import json
from utils.get_cik import getCIK

def get_submissions(ticker):
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
        CIK = getCIK(ticker)
        url = f"https://data.sec.gov/submissions/CIK{CIK}.json"
        
        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            return response.json()  
        else:
            return {"error": f"Failed to fetch data, status code: {response.status_code}"}
    
    except Exception as e:
        return {"error": str(e)} 
    
def get_company_concept(ticker):
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
        CIK = getCIK(ticker)
        url = f"https://data.sec.gov/api/xbrl/companyconcept/CIK{CIK}/us-gaap/AccountsPayableCurrent.json"
        
        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            return response.json()  
        else:
            return {"error": f"Failed to fetch data, status code: {response.status_code}"}
    
    except Exception as e:
        return {"error": str(e)} 
    
def get_company_facts(ticker):
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
        CIK = getCIK(ticker)
        url = f"https://data.sec.gov/api/xbrl/companyfacts/CIK{CIK}.json"
        
        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            return response.json()  
        else:
            return {"error": f"Failed to fetch data, status code: {response.status_code}"}
    
    except Exception as e:
        return {"error": str(e)} 