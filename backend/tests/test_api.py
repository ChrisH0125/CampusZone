import requests

BASE_URL = "http://127.0.0.1:5000"

def test_ucf_crimes():
    resp = requests.get(f"{BASE_URL}/api/ucf-crimes")
    assert resp.status_code == 200
    assert isinstance(resp.json(), list)
    print("✅ /api/ucf-crimes passed!")

def test_danger_score():
    resp = requests.post(f"{BASE_URL}/api/danger-score", json={"location": "Library"})
    assert resp.status_code == 200
    assert "danger_score" in resp.json()
    print("✅ /api/danger-score passed!")

def test_export_pdf():
    resp = requests.post(
        f"{BASE_URL}/api/export-pdf",
        json={"summary": "PDF test summary"}
    )
    assert resp.status_code == 200
    # Response should be PDF bytes
    content_type = resp.headers.get("Content-Type", "")
    assert "application/pdf" in content_type
    print("✅ /api/export-pdf passed!")

if __name__ == "__main__":
    test_ucf_crimes()
    test_danger_score()
    test_export_pdf()
