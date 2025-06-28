import pandas as pd
from sklearn.linear_model import LinearRegression
import numpy as np

def forecast_danger_by_hour(location, csv_path="campus_crimes.csv"):
    df = pd.read_csv(csv_path)
    location_col = "location" if "location" in df.columns else "address"
    # Filter for this location
    df = df[df[location_col].str.lower() == location.lower()]
    if df.empty:
        return None

    df["hour"] = pd.to_datetime(df["timestamp"]).dt.hour
    danger_by_hour = df.groupby("hour").size().reindex(range(24), fill_value=0).values.reshape(-1, 1)

    # Very simple "forecast": linear regression, predict the next 24 hours
    X = np.arange(24).reshape(-1, 1)
    y = danger_by_hour
    model = LinearRegression()
    model.fit(X, y)
    forecast = model.predict(X).flatten()
    # Normalize to [0, 1]
    forecast = (forecast - forecast.min()) / (forecast.max() - forecast.min()) if forecast.max() > forecast.min() else forecast

    # Map to hour:int
    return {hour: float(score) for hour, score in enumerate(forecast)}
