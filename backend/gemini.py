import requests
from config import GEMINI_API_KEY
from prompts import forecast_summary_prompt

def get_forecast_summary(data):
    prompt = forecast_summary_prompt.replace("{DATA_HERE}", data)
    
    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
    headers = {"Content-Type": "application/json"}
    params = {"key": GEMINI_API_KEY}
    body = {
        "contents": [
            {
                "parts": [{"text": prompt}]
            }
        ],
        "generationConfig": {
            "temperature": 0.7
        }
    }

    response = requests.post(url, headers=headers, params=params, json=body)
    response.raise_for_status()
    return response.json()["candidates"][0]["content"]["parts"][0]["text"]
