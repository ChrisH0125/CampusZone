# CampusZone Backend

A Flask-based campus safety management system that provides crime data analysis, danger scoring, and predictive forecasting for university campuses.

## Features

### Core Functionality
- **Crime Data Management**: Process and serve campus crime incident data
- **Danger Scoring**: Calculate location-based danger scores and risk assessments  
- **Predictive Analytics**: Machine learning-powered crime forecasting using Facebook Prophet
- **Hot Zone Detection**: Identify high-risk areas based on historical crime patterns
- **Safety Reports**: Generate comprehensive PDF safety reports
- **AI-Powered Insights**: Gemini AI integration for intelligent crime pattern analysis

### API Endpoints

#### Data Management
- `GET /data.json` - Retrieve crime data
- `GET /incidents/all` - Get all incident records  
- `GET /incidents/update` - Update database with latest incidents
- `GET /api/locations` - Get list of all campus locations
- `GET /api/clean-data` - Clean and normalize crime data

#### Safety Analysis
- `POST /api/danger-score` - Get danger score for specific location
- `POST /api/danger-score-by-hour` - Get hourly danger scores
- `POST /api/danger-forecast` - Generate danger forecasts for locations
- `POST /api/risk-predict` - Predict risk level for location and time
- `GET /api/hot-zones` - Identify high-crime areas

#### Machine Learning & Forecasting  
- `POST /api/forecast-prophet` - Facebook Prophet-based incident forecasting
- `GET /api/crime-forecast` - Comprehensive crime forecast with coordinates
- `POST /api/compare-days` - Compare safety between different days/periods

#### AI & Reports
- `POST /api/gemini-summary` - AI-generated incident summaries
- `POST /api/test-gemini` - Test Gemini AI integration
- `POST /api/export-pdf` - Generate PDF safety reports

### Tech Stack

- **Backend Framework**: Flask 2.3.2
- **Database**: PostgreSQL with psycopg2
- **AI Integration**: Google Gemini AI
- **Machine Learning**: Facebook Prophet, scikit-learn
- **Data Processing**: pandas, numpy
- **Geospatial**: geopandas, geopy
- **PDF Generation**: ReportLab
- **Environment Management**: python-dotenv

## Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up environment variables in `.env`:
```
GEMINI_API_KEY=your_gemini_api_key
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_NAME=your_db_name
```

3. Run the application:
```bash
python app.py
```

## Project Structure

```
backend/
├── app.py              # Main Flask application
├── config.py           # Configuration management
├── prompts.py          # AI prompt templates
├── gemini.py           # Gemini AI integration
├── danger_score.py     # Danger scoring algorithms
├── danger_forecast.py  # Danger forecasting logic
├── hot_zones.py        # Hot zone detection
├── database/
│   ├── db.py          # Database connection
│   ├── incidents.py   # Incident management
│   └── update_database.py # Database updates
├── ml/
│   ├── forecast_prophet.py # Prophet forecasting
│   ├── risk_classifier.py # Risk classification
│   └── plot_danger_by_hour.py # Visualization
├── static/            # Static assets (images, JS)
├── templates/         # HTML templates
└── tests/            # Test suite
```

## API Usage Examples

### Get Danger Score
```bash
curl -X POST http://localhost:5000/api/danger-score \
  -H "Content-Type: application/json" \
  -d '{"location": "Library"}'
```

### Generate Forecast
```bash
curl -X POST http://localhost:5000/api/forecast-prophet \
  -H "Content-Type: application/json" \
  -d '{"location": "Student Union", "days": 7}'
```

### Export Safety Report
```bash
curl -X POST http://localhost:5000/api/export-pdf \
  -H "Content-Type: application/json" \
  -d '{"summary": "Monthly safety report content..."}'
```

## Development

- The application runs in debug mode by default
- CORS is enabled for cross-origin requests
- Static files are served from `/static/` directory
- Templates use Jinja2 templating engine

## Testing

Run tests with:
```bash
python -m pytest tests/
```

## Contributing

1. Follow existing code style and patterns
2. Add tests for new functionality
3. Update documentation as needed
4. Ensure all endpoints handle errors gracefully