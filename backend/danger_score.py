import pandas as pd

# Load data
def load_data(filepath="campus_crimes.csv"):
    df = pd.read_csv(filepath)
    df['hour'] = pd.to_datetime(df['timestamp']).dt.hour
    return df

# Compute normalized danger scores (per location/hour)
def compute_danger_scores(df):
    grouped = df.groupby(['location', 'hour']).size().reset_index(name='count')
    scores = {}
    for location in grouped['location'].unique():
        loc_df = grouped[grouped['location'] == location]
        max_count = loc_df['count'].max()
        # Avoid division by zero if max_count == 0
        loc_scores = {
            int(row['hour']): float(row['count']) / max_count if max_count > 0 else 0.0
            for idx, row in loc_df.iterrows()
        }
        scores[location] = loc_scores
    return scores

# Load data and compute scores at module import
df = load_data()
danger_scores = compute_danger_scores(df)

# Utility: reload scores if the CSV changes
def reload_scores(filepath="campus_crimes.csv"):
    global df, danger_scores
    df = load_data(filepath)
    danger_scores = compute_danger_scores(df)

# Danger score by hour for a location
def get_danger_scores_by_hour(location, csv_path="campus_crimes.csv"):
    df = pd.read_csv(csv_path)
    location_col = "location" if "location" in df.columns else "address"
    df = df[df[location_col].str.lower() == location.lower()]

    if df.empty:
        return {"hours": [], "danger_score": {}}

    if "hour" not in df.columns:
        df["hour"] = pd.to_datetime(df["timestamp"]).dt.hour  # use timestamp here

    danger_by_hour = df.groupby("hour").size().to_dict()
    max_value = max(danger_by_hour.values(), default=0)
    peak_hours = [int(hr) for hr, val in danger_by_hour.items() if val == max_value]
    return {"hours": peak_hours, "danger_score": {str(hr): val for hr, val in danger_by_hour.items()}}

# Example usage
# if __name__ == "__main__":
#     print(danger_scores)
#     print(get_danger_scores_by_hour("Library"))
