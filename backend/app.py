from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from gemini import get_forecast_summary
from spotcrime_client import SpotCrimeClient
from danger_score import danger_scores  # (or: from danger_score import get_location_scores)

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return send_file("test.html")

@app.route("/api/test-gemini", methods=["POST"])
def test_gemini():
    # Ensure we have valid input
    data = request.json.get("data") if request.is_json else None
    if not data:
        return jsonify({"error": "Missing or invalid 'data'"}), 400
    try:
        result = get_forecast_summary(data)
        return jsonify({"result": result}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/ucf-crimes", methods=["GET"])
def get_ucf_crimes():
    try:
        client = SpotCrimeClient()
        crimes = client.get_ucf_crimes()
        return jsonify([crime.__dict__ for crime in crimes]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/danger-score", methods=["POST"])
def api_danger_score():
    # Check for JSON and 'location' in input
    location = request.json.get("location") if request.is_json else None
    if not location:
        return jsonify({"error": "Missing 'location'"}), 400
    try:
        scores = danger_scores.get(location, {})
        return jsonify({"danger_score": scores}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Optional: global handler for 404 Not Found
@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
