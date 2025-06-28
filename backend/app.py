from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from gemini import get_forecast_summary
from spotcrime_client import SpotCrimeClient
from danger_score import danger_scores  # (or: from danger_score import get_location_scores)

# PDF export imports
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from io import BytesIO

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return send_file("test.html")

@app.route("/api/test-gemini", methods=["POST"])
def test_gemini():
    data = request.json.get("data", "")
    try:
        result = get_forecast_summary(data)
        return jsonify({"result": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/ucf-crimes", methods=["GET"])
def get_ucf_crimes():
    client = SpotCrimeClient()
    crimes = client.get_ucf_crimes()
    return jsonify([crime.__dict__ for crime in crimes])

# 🚨 Danger Score endpoint:
@app.route("/api/danger-score", methods=["POST"])
def api_danger_score():
    location = request.json.get("location")
    if not location:
        return jsonify({"error": "Missing location"}), 400
    scores = danger_scores.get(location, {})
    return jsonify({"danger_score": scores})

# 🚀 PDF Export endpoint:
@app.route("/api/export-pdf", methods=["POST"])
def export_pdf():
    content = request.json.get("summary") or request.json.get("data") or "No summary provided."

    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=letter)
    width, height = letter
    p.drawString(72, height - 72, "CampusZone Report")
    text_obj = p.beginText(72, height - 100)
    text_obj.setFont("Helvetica", 12)

    # Handle multi-line text
    for line in content.split('\n'):
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

if __name__ == "__main__":
    app.run(debug=True)
