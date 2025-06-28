from flask import Flask, request, jsonify, send_file, render_template
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from io import BytesIO
import pandas as pd
from flask_cors import CORS
from gemini import get_forecast_summary
from danger_score import danger_scores  # (or: from danger_score import get_location_scores)
import os
from danger_score import get_danger_scores_by_hour

from danger_forecast import forecast_danger_by_hour


# PDF export imports
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from io import BytesIO

# functions
from database import incidents, update_database

app = Flask(__name__)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CORS(app)


@app.route("/")
def home():
    return send_file("home.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/dashboard")
def dashboard():
    return render_template("map.html")


# database routes
@app.route("/incidents/all", methods=["GET"])
def get_all():
    return incidents.get_all_incidents()


@app.route("/incidents/update", methods=["GET"])
def update():
  return update_database.update_data()

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
    for line in summary.split("\n"):
        text_obj.textLine(line)
    p.drawText(text_obj)
    p.showPage()
    p.save()
    buffer.seek(0)

    return send_file(
        buffer,
        mimetype="application/pdf",
        as_attachment=True,
        download_name="campuszone_report.pdf",
    )


@app.route("/api/danger-score-by-hour", methods=["POST"])
def api_danger_score_by_hour():
    location = request.json.get("location")
    if not location:
        return jsonify({"error": "Missing location"}), 400
    result = get_danger_scores_by_hour(location)
    return jsonify(result)


@app.route("/api/danger-forecast", methods=["POST"])
def danger_forecast_api():
    location = request.json.get("location")
    if not location:
        return jsonify({"error": "Missing location"}), 400

    forecast = forecast_danger_by_hour(location)
    if forecast is None:
        return jsonify({"error": f"No data for location: {location}"}), 404

    return jsonify({"forecast": forecast})


@app.route("/api/locations", methods=["GET"])
def get_locations():
    import pandas as pd

    df = pd.read_csv("campus_crimes.csv")
    locations = df["location"].dropna().unique().tolist()
    return jsonify({"locations": locations})


@app.route("/api/clean-data", methods=["GET"])
def clean_data():
    try:
        df = pd.read_csv("campus_crimes.csv")
        df = df.rename(columns=lambda x: x.strip().lower())
        if "timestamp" in df.columns:
            df["timestamp"] = pd.to_datetime(df["timestamp"], errors="coerce")
        df = df.dropna(subset=["location", "timestamp", "type"])
        data = df.to_dict(orient="records")
        return jsonify({"data": data})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/gemini-summary", methods=["POST"])
def gemini_summary():
    """
    Standardized endpoint for Gemini summary.
    Expects JSON:
        {
            "data": [
                {"location": "...", "type": "...", "timestamp": "..."},
                ...
            ]
        }
    Returns:
        {"summary": "..."}
    """
    try:
        incidents = request.json.get("data", [])
        if not incidents or not isinstance(incidents, list):
            return jsonify({"error": "No valid 'data' (incident list) provided"}), 400

        # Compose readable summary input for Gemini LLM
        summary_input = ""
        for incident in incidents:
            location = incident.get("location", "Unknown Location")
            ttype = incident.get("type", "Unknown Type")
            time = incident.get("timestamp", "Unknown Time")
            summary_input += f"Location: {location}, Type: {ttype}, Time: {time}\n"

        gemini_output = get_forecast_summary(summary_input)
        return jsonify({"summary": gemini_output})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/compare-days", methods=["POST"])
def compare_days():
    """
    Input: { "day_a": "2025-06-25", "day_b": "2025-06-24" }
    or { "range_a": ["2025-06-20", "2025-06-25"], "range_b": ["2025-06-10", "2025-06-15"] }
    Output: { "incidents_a": [...], "incidents_b": [...], "summary": "..." }
    """
    req = request.json or {}
    # Parse days or ranges
    day_a = req.get("day_a")
    day_b = req.get("day_b")
    range_a = req.get("range_a")
    range_b = req.get("range_b")
    # Use your CSV or DataFrame here!
    try:
        import pandas as pd

        df = pd.read_csv("campus_crimes.csv")
        df["datetime"] = pd.to_datetime(
            df["timestamp"] if "timestamp" in df.columns else df["datetime"]
        )

        def filter_by(day=None, date_range=None):
            if day:
                mask = df["datetime"].dt.date == pd.to_datetime(day).date()
            elif date_range:
                start, end = (
                    pd.to_datetime(date_range[0]),
                    pd.to_datetime(date_range[1]),
                )
                mask = (df["datetime"] >= start) & (df["datetime"] <= end)
            else:
                mask = pd.Series([False] * len(df))
            return df[mask]

        incidents_a = filter_by(day_a, range_a).to_dict(orient="records")
        incidents_b = filter_by(day_b, range_b).to_dict(orient="records")

        # Gemini summary (reuse your helper)
        from gemini import get_forecast_summary

        # Construct a prompt or data string for comparison (tune as needed)
        summary_input = {
            "incidents_a": incidents_a,
            "incidents_b": incidents_b,
            "label_a": day_a or range_a,
            "label_b": day_b or range_b,
        }
        # The Gemini function might need tweaking if it only takes one set at a time!
        # For demo, just concatenate descriptions.
        prompt = f"""Compare two days/ranges for campus safety:\n\nA ({summary_input["label_a"]}): {len(incidents_a)} incidents.\nB ({summary_input["label_b"]}): {len(incidents_b)} incidents.\n\nSummarize which period seems riskier, why, and note any patterns."""
        summary = get_forecast_summary(prompt)

        return jsonify(
            {"incidents_a": incidents_a, "incidents_b": incidents_b, "summary": summary}
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
