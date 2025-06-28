# database initialization
import psycopg2

from dotenv import dotenv_values

config = dotenv_values(".env")

def get_db_connection():
  con = psycopg2.connect(
    user = config['DB_USER'],
    password = config['DB_PASSWORD'],
    host = config['DB_HOST'],
    port = config['DB_PORT'],
    database = config['DB_NAME']
  )
  return con