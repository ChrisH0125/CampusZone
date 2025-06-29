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

crime_forecast_prompt = """
You are an expert campus safety analyst. Based on the historical crime data provided, generate a predictive forecast about future crime trends and patterns.

Historical Crime Data:
{data}

Instructions:
- Analyze patterns in crime types, locations, times, and danger levels
- Predict likely future trends based on historical patterns
- Identify the most vulnerable areas and times
- Provide actionable safety recommendations
- Write in a clear, informative tone suitable for students
- Keep response to 150-200 words maximum
- Focus on practical insights that help students stay safe
- Format your response using HTML with bullet points (<ul><li>) for key insights
- Bold all location names using <strong> tags (e.g., <strong>Library Area</strong>, <strong>Parking Lot C</strong>)
- Structure your response with clear bullet points for better readability

Please provide a comprehensive forecast using HTML formatting with bullet points and bold locations that students can use to make informed safety decisions.
"""