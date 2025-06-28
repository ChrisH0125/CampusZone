forecast_summary_prompt = """
You are a campus safety assistant. Based on the incidents listed below, generate a brief natural-language summary for students about which areas are most dangerous and any patterns they should be aware of.

Data:
{DATA_HERE}

Instructions:
- Mention top 2–3 danger zones
- Include times if notable
- Use friendly but informative tone
- Max 100 words
"""

compare_days_prompt = """
You are comparing safety on two different days using campus incident data. Provide a short paragraph evaluating which day had higher risk and why.

Monday Data:
{MONDAY_DATA}

Friday Data:
{FRIDAY_DATA}

Respond:
- Which day was riskier overall?
- Mention any location patterns
- End with a recommendation like \"If choosing between the two days, Friday appears safer.\"
"""

personalized_greeting_prompt = """
Act as a personalized UCF campus safety assistant. The student is named {NAME} and lives near the {DORM} dorms. Today is {DAY}. Based on recent crime data, write a short paragraph to greet the student, summarize risks near their area, and suggest safer times/places to travel.
"""