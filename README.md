# CampusZone
### Campus Safety Forecast App

A predictive web app that identifies high-risk zones on campus based on past incident data and provides AI-generated safety recommendations using Gemini.

## 🔍 Problem Statement

Students receive campus alerts *after* an incident occurs — but what if we could **forecast** risk zones before students head out?

## 🎯 Our Solution

We built a tool that lets students:
- Choose a day and time
- View an interactive map of campus danger zones
- Get a real-time safety summary powered by Gemini
- Compare two days for risk level
- Export their summary or get it via email/SMS

## 💡 Features

- 📍 Color-coded interactive campus map
- 📅 Day selector (default = today)
- ⚠️ AI-generated summary of top risk zones
- 🔁 Compare days side-by-side
- 🔥 Forecast animation of shifting danger zones
- 📈 Past trends sparkline (danger score over time)
- 📄 Download as PDF or share via email
- 🔐 Optional student login for personalized Gemini alerts
- 📫 Newsletter signup to get weekly safety tips

## 🛠️ Tech Stack

| Frontend   | Backend       | ML & AI       | Database     |
|------------|---------------|---------------|--------------|
| React      | Flask (Python)| Gemini API    | SQLite / SQL |
| Leaflet.js | REST API      | Danger Scoring| Pandas       |
| TailwindCSS| Axios         |               |              |

## 📂 File Structure
    📁 frontend/
    └── components/
    └── pages/
    📁 backend/
    └── app.py
    └── danger_score.py
    └── gemini_summary.py
    📁 data/
    └── campus_incidents.csv
    .env
    README.md

## 🔗 Live Demo

[Coming Soon]

## 📸 Screenshots

- Map with danger zones
- Gemini summary
- Day comparison view
- Sparkline of past weeks

## ⚙️ How to Run Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/yourteam/campus-safety-forecast.git

2. Install backend dependencies:
    ```bash
    cd backend
    pip install -r requirements.txt

3. Start Flask backend:
    ```bash
    python app.py

4. Run frontend:
    ```bash
    cd frontend
    npm install
    npm run dev

5. Make sure to create a .env with your Gemini API key.

## 👥 Team
Name	Role
Lisa	ML Developer
Anthony	Data Engineer
Pablo	Map Engineer
Chris	AI & UX Writer

## 💬 Inspiration
We wanted to create a tool that could prevent harm, not just report it — using open data, accessible maps, and generative AI to empower students.