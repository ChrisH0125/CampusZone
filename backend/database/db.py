# database initialization
import psycopg2

from dotenv import dotenv_values

config = dotenv_values(".env")

con = psycopg2.connect(
  user = config['DB_USER'],
  password = config['DB_PASSWORD'],
  host = config['DB_HOST'],
  port = config['DB_PORT'],
  database = config['DB_NAME']
)

print(f"Connected to database on {config['DB_HOST']}:{config['DB_PORT']}")

cur = con.cursor()

# close the cursor
cur.close()

# close connection
con.close()