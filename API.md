# CampusZone API Reference

A simple REST API for campus crime data, AI safety summaries, and reporting.

---

## **Endpoints**

### `GET /`

- **Description:** Returns a test HTML page.
- **Response:** `text/html`

---

### `POST /api/test-gemini`

- **Description:** Generates a safety forecast summary using Gemini API.
- **Request JSON:**
    
    ```json
    {
      "data": "Area: Gym, Time: 9PM, Type: Harassment"
    }
    ```
    
- **Response JSON:**
    
    ```json
    {
      "result": "A summary string from Gemini."
    }
    ```
    

---

### `GET /api/ucf-crimes`

- **Description:** Returns a list of recent crimes near UCF.
- **Response JSON:**
    
    Array of crime objects (see schema in code).
    

---

### `POST /api/danger-score`

- **Description:** Returns a dictionary of hourly danger scores for a location.
- **Request JSON:**
    
    ```json
    {
      "location": "Library"
    }
    ```
    
- **Response JSON:**
    
    ```json
    {
      "danger_score": {"21": 1.0, "22": 0.5}
    }
    ```
    

---

### `POST /api/export-pdf`

- **Description:** Returns a PDF report containing your summary or data.
- **Request JSON:**
    
    ```json
    {
      "summary": "Text to include in the PDF."
    }
    ```
    
- **Response:**
    
    PDF file as binary data (set `--output report.pdf` with curl).
    

---

## **Status Codes**

- `200 OK` – Success
- `400 Bad Request` – Missing or invalid data
- `500 Internal Server Error` – Something went wrong on the server

---

## **Example Usage**

```
curl -X POST http://127.0.0.1:5000/api/danger-score \
  -H "Content-Type: application/json" \
  -d '{"location": "Library"}'
```

---

## **More**

- See README.md for setup instructions and context.
- Contact for questions.