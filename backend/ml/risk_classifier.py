import pandas as pd
from sklearn.ensemble import RandomForestClassifier

def train_risk_classifier(csv_path="backend/campus_crimes.csv"):
    df = pd.read_csv(csv_path)
    # Prepare features
    df["hour"] = pd.to_datetime(df["timestamp"]).dt.hour
    df["is_risky"] = 1  # Every row is an incident, so this hour is risky
    X = df[["hour"]]
    y = df["is_risky"]
    clf = RandomForestClassifier(n_estimators=100, random_state=42)
    clf.fit(X, y)
    return clf

# For demo, predict for any hour
def is_hour_risky(location, hour, csv_path="backend/campus_crimes.csv"):
    clf = train_risk_classifier(csv_path)
    return bool(clf.predict([[hour]])[0])
