import pandas as pd
import matplotlib.pyplot as plt

# Load the data
df = pd.read_csv("../campus_crimes.csv")

# Extract hour from timestamp
df['hour'] = pd.to_datetime(df['timestamp']).dt.hour

# Get all unique locations
locations = df['location'].unique()

plt.figure(figsize=(12, 6))

for loc in locations:
    loc_df = df[df['location'] == loc]
    hour_counts = loc_df.groupby('hour').size()
    plt.plot(hour_counts.index, hour_counts.values, marker='o', label=loc)

plt.title("Danger by Hour: All Locations")
plt.xlabel("Hour of Day")
plt.ylabel("Number of Incidents")
plt.legend()
plt.grid(alpha=0.2)
plt.tight_layout()
plt.savefig("danger_by_hour_all_locations.png")
plt.show()
