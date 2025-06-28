forecast_summary_prompt = """
You are a campus safety assistant. Based on the incidents listed below, generate a brief natural-language summary for students about which areas are most dangerous and any patterns they should be aware of.

Data:
{data}

Instructions:
- Mention top 2–3 danger zones
- Include times if notable
- Use friendly but informative tone
- Max 100 words
"""

compare_days_prompt = """
You are comparing safety on two different days using campus incident data. Provide a short paragraph evaluating which day had higher risk and why.

Monday Data:
{monday_data}

Friday Data:
{friday_data}

Respond:
- Which day was riskier overall?
- Mention any location patterns
- End with a recommendation like "If choosing between the two days, Friday appears safer."
- Put these responses in a bulleted format
"""

personalized_greeting_prompt = """
Act as a personalized UCF campus safety assistant. The student is named {name} and lives near the {dorm} dorms. Today is {day}. Based on recent crime data, write a short paragraph to greet the student, summarize risks near their area, and suggest safer times/places to travel.
"""