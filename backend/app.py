from flask import Flask, request, jsonify, send_file
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from io import BytesIO
from flask_cors import CORS
from gemini import get_forecast_summary
from spotcrime_client import SpotCrimeClient
from danger_score import danger_scores  # (or: from danger_score import get_location_scores)
from danger_score import get_danger_scores_by_hour

# PDF export imports
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from io import BytesIO

# functions
from database import incidents

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return send_file("test.html")

# database routes
@app.route("/incidents/all", methods=["GET"])
def get_all():
  return incidents.get_all_incidents()

# test gemini
@app.route("/api/test-gemini", methods=["POST"])
def test_gemini():
    data = request.json.get("data") if request.is_json else None
    if not data:
        return jsonify({"error": "Missing 'data' in request."}), 400

    try:
        result = get_forecast_summary(data)
        return jsonify({"result": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Get UCF Crimes
@app.route("/api/ucf-crimes", methods=["GET"])
def get_ucf_crimes():
    try:
        client = SpotCrimeClient()
        crimes = client.get_ucf_crimes()
        return jsonify([crime.__dict__ for crime in crimes])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 🚨 Danger Score endpoint:
@app.route("/api/danger-score", methods=["POST"])
def api_danger_score():
    data = request.get_json()
    location = data.get("location") if data else None
    if not location:
        return jsonify({"error": "Missing 'location' in request."}), 400

    scores = danger_scores.get(location)
    if scores is None:
        return jsonify({"error": f"No data found for location: {location}"}), 404

    return jsonify({"danger_score": scores})

# 🚀 PDF Export endpoint:
@app.route("/api/export-pdf", methods=["POST"])
def export_pdf():
    data = request.get_json()
    summary = data.get("summary") if data else None

    if not summary:
        return jsonify({"error": "Missing 'summary' in request."}), 400

    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=letter)
    width, height = letter
    p.drawString(72, height - 72, "CampusZone Report")
    text_obj = p.beginText(72, height - 100)
    text_obj.setFont("Helvetica", 12)

    # Handle multi-line text
    for line in summary.split('\n'):
        text_obj.textLine(line)
    p.drawText(text_obj)
    p.showPage()
    p.save()
    buffer.seek(0)

    return send_file(
        buffer,
        mimetype='application/pdf',
        as_attachment=True,
        download_name="campuszone_report.pdf"
    )

@app.route("/api/danger-score-by-hour", methods=["POST"])
def api_danger_score_by_hour():
    location = request.json.get("location")
    if not location:
        return jsonify({"error": "Missing location"}), 400
    result = get_danger_scores_by_hour(location)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
