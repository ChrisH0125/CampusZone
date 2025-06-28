# ml/danger_forecast.py

import pandas as pd
from statsmodels.tsa.holtwinters import ExponentialSmoothing
import os

DATA_PATH = os.path.join(os.path.dirname(__file__), '..', 'campus_crimes.csv')

def load_data(filepath=DATA_PATH):
    df = pd.read_csv(filepath)
    # Adjust for your actual column names!
    if "timestamp" in df.columns:
        df['datetime'] = pd.to_datetime(df['timestamp'])
    elif "datetime" in df.columns:
        df['datetime'] = pd.to_datetime(df['datetime'])
    else:
        raise ValueError("No datetime/timestamp column found.")
    if "hour" not in df.columns:
        df['hour'] = df['datetime'].dt.hour
    return df

def forecast_danger_by_hour(location):
    """
    Forecasts crime counts for all 24 hours for a given location.
    Returns: {hour: predicted_count, ...} for hours 0..23
    """
    df = load_data()
    # Use 'location' or 'address' as needed
    if "location" in df.columns:
        df_loc = df[df["location"].str.lower() == location.lower()]
    elif "address" in df.columns:
        df_loc = df[df["address"].str.lower() == location.lower()]
    else:
        raise ValueError("No location/address column found.")

    if df_loc.empty:
        return {"error": f"No data for location: {location}"}
    
    # Group by hour, count crimes
    hour_counts = df_loc.groupby('hour').size()
    # Fill in all 24 hours with 0 if missing
    hour_counts = hour_counts.reindex(range(24), fill_value=0).sort_index()
    # Model & forecast
    model = ExponentialSmoothing(hour_counts, trend=None, seasonal=None, initialization_method="estimated")
    fit = model.fit()
    forecast = fit.forecast(24)
    result = {int(hr): max(0, float(val)) for hr, val in zip(range(24), forecast)}
    return result

# Quick test if run as script
if __name__ == "__main__":
    out = forecast_danger_by_hour("Library")
    print(out)
