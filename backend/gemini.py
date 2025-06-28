import os
import requests
from dotenv import load_dotenv
from prompts import forecast_summary_prompt

# Load environment variables from .env file
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise EnvironmentError("Missing GEMINI_API_KEY. Please check your .env file.")

# Use the latest model your key supports
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent"

def get_forecast_summary(data):
    # Format the prompt using Python's format (not replace)
    prompt = forecast_summary_prompt.format(data=data)
    
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

    try:
        response = requests.post(GEMINI_API_URL, headers=headers, params=params, json=body)
        response.raise_for_status()
        return response.json()["candidates"][0]["content"]["parts"][0]["text"]
    except requests.exceptions.RequestException as e:
        # More user-friendly error reporting
        try:
            return f"❌ Gemini API Error: {e}\n🔎 Response Text: {response.text}"
        except Exception:
            return f"❌ Gemini API Error: {e}\n(No response body received.)"
    except (KeyError, IndexError):
        return "❌ Gemini API responded with unexpected format."
