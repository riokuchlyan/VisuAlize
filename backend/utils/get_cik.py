# internal

# external
import pandas as pd

# built-in

def getCIK(ticker: str) -> str:
    cik_data = pd.read_csv("./data/cik.csv", delimiter='\t', header=None)
    data = cik_data.set_index(0)
    try:
        ticker=str(int(data.loc[ticker.lower(), 1]))
        temp = ticker
        for i in range(10-len(temp)):
            ticker = '0' + ticker
        return ticker

    except Exception as e:
        return str(e)