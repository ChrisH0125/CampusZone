import pandas as pd
from prophet import Prophet

def forecast_incidents(location, days=7, csv_path="backend/campus_crimes.csv"):
    df = pd.read_csv(csv_path)
    df = df[df['location'] == location]
    if df.empty:
        return None
    df['ds'] = pd.to_datetime(df['timestamp']).dt.date
    series = df.groupby('ds').size().reset_index(name='y')
    if len(series) < 5:
        # Prophet needs enough data
        return None
    m = Prophet()
    m.fit(series)
    future = m.make_future_dataframe(periods=days)
    forecast = m.predict(future)
    return forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail(days)
