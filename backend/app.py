from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from gemini import get_forecast_summary
from spotcrime_client import SpotCrimeClient

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

if __name__ == "__main__":
    app.run(debug=True)
