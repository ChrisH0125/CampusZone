import requests

BASE_URL = "http://127.0.0.1:5000"

def test_home():
    response = requests.get(f"{BASE_URL}/")
    assert response.status_code == 200

def test_danger_score():
    payload = {"location": "Library"}
    response = requests.post(f"{BASE_URL}/api/danger-score", json=payload)
    assert response.status_code == 200
    assert "danger_score" in response.json()

def test_gemini_summary():
    payload = {
        "data": [
            {"location": "Library", "type": "Theft", "timestamp": "2025-06-25T12:00:00Z"},
        ]
    }
    response = requests.post(f"{BASE_URL}/api/gemini-summary", json=payload)
    assert response.status_code == 200
    assert "summary" in response.json()

def test_compare_days_empty():
    payload = {"day_a": "2025-06-01", "day_b": "2025-06-02"}
    response = requests.post(f"{BASE_URL}/api/compare-days", json=payload)
    assert response.status_code == 200
    assert "summary" in response.json()
