import pandas as pd
from sklearn.cluster import KMeans

def find_hot_zones(csv_path="campus_crimes.csv", n_clusters=3):
    print("Reading data from", csv_path)
    df = pd.read_csv(csv_path)
    print("Data columns:", df.columns)
    print("Data sample:", df.head())
    
    # Extract hour from timestamp if not already present
    if "hour" not in df.columns:
        df['hour'] = pd.to_datetime(df['timestamp']).dt.hour

    if "location" not in df.columns or "hour" not in df.columns:
        raise ValueError("CSV missing 'location' or 'hour' column")

    df['location_code'] = df['location'].astype('category').cat.codes
    features = df[['location_code', 'hour']]

    print("Features for clustering:\n", features.head())

    kmeans = KMeans(n_clusters=n_clusters, random_state=0).fit(features)
    df['zone'] = kmeans.labels_
    
    # Just for debug: show centroids
    print("Cluster centers:", kmeans.cluster_centers_)
    
    # You can return different results here, but this is simple:
    zones = df.groupby('zone')['location'].apply(lambda x: x.mode()[0]).to_dict()
    print("Resulting hot zones:", zones)
    return zones

if __name__ == "__main__":
    find_hot_zones()
