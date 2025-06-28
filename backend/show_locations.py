import pandas as pd

df = pd.read_csv("campus_crimes.csv")
print(df["location"].unique())
