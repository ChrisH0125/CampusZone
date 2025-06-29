from . import db

def get_all_incidents():
  con = db.get_db_connection()
  cur = con.cursor()
  cur.execute("select * from incidents")

  incidents_arr = []
  rows = cur.fetchall()
  print("Number of incidents fetched:", len(rows))  # Debug line
  for r in rows:
    incidents_arr.append({
      'name':r[1],
      'time':r[2],
      'address':r[3],
      'coordinates':r[4] or None,
      'case_status':r[5],
      'case_number':r[6] or None,
      'danger_level':r[7] or None
    })

  cur.close()
  con.close()

  return incidents_arr

  