# danger_score.py

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

# Example usage (uncomment to test directly)
# if __name__ == "__main__":
#     print(danger_scores)
