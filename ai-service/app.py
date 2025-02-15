from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
from prophet import Prophet
import pandas as pd

app = FastAPI()

def preprocess(trend_data):
    # Ensure the trend_data dict has a DataFrame-friendly structure with 'ds' and 'y' fields
    df = pd.DataFrame(trend_data)
    df['ds'] = pd.to_datetime(df['ds'])
    return df

class TrendData(BaseModel):
    ds: list[str]
    y: list[float]

@app.post("/predict")
def predict_virality(trend: TrendData):
    data = {"ds": trend.ds, "y": trend.y}
    df = preprocess(data)
    m = Prophet(interval_width=0.95)
    m.fit(df)
    future = m.make_future_dataframe(periods=7)
    forecast = m.predict(future)
    return forecast.to_dict('records')