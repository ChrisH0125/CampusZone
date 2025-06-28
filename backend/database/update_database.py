from . import db
import datetime
import json
import os
from functools import reduce

def get_ucf_data():
  base_dir = os.path.dirname(os.path.abspath(__file__))
  json_path = os.path.join(base_dir, 'crime_log.json')
  with open(json_path) as f:
    data = json.load(f)

  return data

def update_data():
  crime_list = get_ucf_data()

  con = db.get_db_connection()
  cur = con.cursor()

  try:
    for crime in crime_list:
      time_str = crime['time']
      time_stamp = datetime.datetime.strptime(time_str, "%a, %d %b %Y %H:%M:%S %Z")
      print(time_stamp)

      cur.execute("insert into incidents (name, time, address, case_number, case_status) values (%s, %s, %s, %s, %s)", (crime['name'], time_stamp, crime['address'],crime['case_number'],crime['case_status']))
      con.commit()
  except Exception as e:
    return "error"

  cur.close()
  
  con.close()   

  return 'success'




