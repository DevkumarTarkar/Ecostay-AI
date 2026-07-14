# Prompts Log: AI Travel Planner

This file documents the iterative prompt engineering process used to build the Eco-Travel Planner for EcoStay AI, running on Google Gemini `gemini-1.5-flash`.

---

## Prompt Version 1: The Generic Planner

### System Prompt & Context
```
Create a day-by-day travel plan based on the user's input of destination, days, budget, and interests.
```

### Example Input
* **Destination**: Coorg
* **Days**: 3
* **Budget**: 15000
* **Interests**: Nature, Adventure

### Example Output
```
Day 1: Arrive in Coorg. Visit Abbey Falls in the afternoon. Have dinner at a local place.
Day 2: Go trekking at Tadiandamol Peak. Ensure you carry water.
Day 3: Visit Dubare Elephant Camp. Head home.
```

### Review & Critique
* **Quality**: Extremely generic and lacks formatting.
* **Database Alignment**: Did not recommend any villas from our local database.
* **Eco-tourism Context**: Failed to provide specific sustainability tips or highlight green practices.

---

## Prompt Version 2: The Eco-Tourism Guide (Text-based)

### System Prompt & Context
```
You are an eco-tourism travel guide. Help the user plan a sustainable vacation. Recommend homestays from the database list.
Database list: [List of database homestays here]
```

### Example Input
* **Destination**: Coorg
* **Days**: 3
* **Budget**: 15000
* **Interests**: Nature, Adventure

### Example Output
```
Welcome to Coorg! Here is a green itinerary:
Day 1: Walk around local organic coffee estates. I recommend staying at Sutra Heritage Stay (ID: 1).
Day 2: Hike Tadiandamol peak and avoid littering.
Day 3: Learn spice cultivation and depart.
Green Tips: Refuse plastic, save water.
```

### Review & Critique
* **Quality**: Better, contains eco-friendly ideas.
* **Database Alignment**: Recommends a villa from our list, but returning it inside unstructured text makes it impossible for the frontend to render dynamic interactive cards or bookable links.
* **Structure**: Fails to consistently split itinerary text from tips or cost summaries.

---

## Prompt Version 3: The Structured Eco-Concierge (Final Selection)

### System Prompt & Context
```
You are an expert eco-tourism travel planner and concierge for 'EcoStay AI'. 
Your task is to generate a custom, highly sustainable travel itinerary and recommend real homestays from the database. 
You MUST return your response as a valid JSON object matching this structure EXACTLY:
{
  "success": true,
  "itinerary": "Markdown formatted day-wise itinerary text",
  "recommended_homestay_ids": [list of integer IDs from the database list],
  "sustainability_tips": [list of 3-5 specific local green tips],
  "estimated_costs": "budget breakdown string"
}

Only recommend homestays that are present in the database list provided below. Match them by location or theme.
Database Homestays List: [JSON formatted list of available homestays from DB]
```

### Example Input
* **Destination**: Coorg
* **Days**: 3
* **Budget**: 15000
* **Interests**: Nature, Adventure

### Example Output (JSON Response)
```json
{
  "success": true,
  "itinerary": "### Day 1: Coffee Estate Trails & Low Impact Living\n- **Morning**: Start with a guided nature trail through a organic coffee estate, identifying indigenous bird species.\n- **Afternoon**: Traditional lunch cooked using firewood and local ingredients.\n- **Evening**: Learn about rainwater harvesting methods.\n\n### Day 2: Trekking Tadiandamol\n- **Morning**: Trek the magnificent Tadiandamol peak. Pack snacks in reusable boxes; leave no trace.\n- **Afternoon**: Local organic vegetarian lunch.\n- **Evening**: Relax and star-gaze.",
  "recommended_homestay_ids": [1],
  "sustainability_tips": [
    "Coorg spice valleys are sensitive; stay on designated trails to prevent soil erosion.",
    "Minimize shower water usage to help conserve mountain spring reservoirs."
  ],
  "estimated_costs": "Accommodation: ₹9,000 | Eco-tours & local meals: ₹4,000 | Reserve: ₹2,000"
}
```

### Why Prompt Version 3 Was Selected
1. **Strict Output Formatting**: Enforcing a strict JSON schema via `responseMimeType: "application/json"` ensures the backend can parse individual values cleanly without regular expression guesswork.
2. **True Database Integration**: By providing a JSON array of database homestays in the system instruction, the AI maps matches cleanly, allowing the frontend to render real clickable villa links.
3. **Structured User Interface**: Separating the day-wise itinerary, eco-tips, and budget breakdown lets us design distinct components (markdown renderer, tips panel, cost cards) rather than dumping raw text on the user.
