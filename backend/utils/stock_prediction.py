import yfinance as yf
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import precision_score #to test accuracy
import pandas as pd


def ml_stock_prediction(ticker):

    stock_data=yf.Ticker(ticker)

    stock_data=stock_data.history(period="max")

    stock_data.plot.line(y="Close", use_index=True)


    del stock_data["Dividends"]
    del stock_data["Stock Splits"]

    stock_data["Tomorrow"]=stock_data["Close"].shift(-1)

    stock_data["Target"] = (stock_data["Tomorrow"]>stock_data["Close"]).astype(int)

    stock_data = stock_data.loc["2010-01-01":].copy()

    model=RandomForestClassifier(n_estimators=100, min_samples_split=100, random_state=1)

    #so model doesnt use future data to predict past
    train=stock_data.iloc[:-100] 
    test=stock_data.iloc[-100:]

    predictors=["Close", "Volume", "Open", "High", "Low"]
    model.fit(train[predictors], train["Target"])

    RandomForestClassifier(min_samples_split=100, random_state=1)

    preds=model.predict((test[predictors]))
    preds = pd.Series(preds, index=test.index)
    score=precision_score(test["Target"], preds)
    combined=pd.concat([test["Target"], preds], axis=1)
    combined.plot()

    def predict(train, test, predictors, model):
        model.fit(train[predictors], train["Target"])
        preds=model.predict(test[predictors])
        preds=pd.Series(preds, index=test.index, name="Predictions")
        combined=pd.concat([test["Target"], preds], axis=1)
        return combined

    def backtest(data, model, predictors, start=2500, step=250):
        all_predictons=[]
        for i in range(start, data.shape[0], step):
            train=data.iloc[0:i].copy()
            test=data.iloc[i:(i+step)].copy()
            predictions=predict(train, test, predictors, model)
            all_predictons.append(predictions)
        return pd.concat(all_predictons)

    horizons=[2,5,60,250,1000]
    new_predictors=[]
    for horizon in horizons:
        rolling_averages=stock_data.rolling(horizon).mean()
        ratio_column=f"Close_Ratio_{horizon}"
        stock_data[ratio_column]=stock_data["Close"] / rolling_averages["Close"]
        trend_column=f"Trend_{horizon}"
        stock_data[trend_column]=stock_data.shift(1).rolling(horizon).sum()["Target"]
        new_predictors+=[ratio_column, trend_column]
    stock_data=stock_data.dropna()

    model=RandomForestClassifier(n_estimators=200, min_samples_split=50, random_state=1)

    def predict(train, test, predictors, model):
        model.fit(train[predictors], train["Target"])
        preds=model.predict_proba(test[predictors])[:,1]
        preds[preds>=.6]=1
        preds[preds<.6]=0
        preds=pd.Series(preds, index=test.index, name="Predictions")
        combined=pd.concat([test["Target"], preds], axis=1)
        return combined

    predictions=backtest(stock_data, model, new_predictors)
    print(predictions["Predictions"].value_counts())
    print(precision_score(predictions["Target"], predictions["Predictions"]))
    #print(predictions["Target"].value_counts()/predictions.shape[0]) 
    #print(stock_data)

print(ml_stock_prediction("TSLA"))