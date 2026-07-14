from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import json
import urllib.request
import urllib.error
from typing import List, Union, Dict, Any
from pydantic import BaseModel

from ..database import get_db
from ..services.homestay_service import HomestayService
from ..config import settings

router = APIRouter(prefix="/ai", tags=["ai"])

class TravelPlanRequest(BaseModel):
    destination: str
    days: int
    budget: str
    interests: Union[str, List[str]]

@router.post("/travel-plan")
async def generate_travel_plan(request_data: TravelPlanRequest, db: Session = Depends(get_db)):
    # 1. Fetch available homestays from the database
    db_homestays = HomestayService.get_all(db)
    homestays_list = []
    for h in db_homestays:
        homestays_list.append({
            "id": h.id,
            "title": h.title,
            "location": h.location,
            "price_per_night": h.price_per_night,
            "sustainability_level": h.sustainability_level,
            "amenities": h.amenities,
            "description": h.description or ""
        })

    # 2. Format interests to a list
    interests_list = request_data.interests
    if isinstance(interests_list, str):
        interests_list = [i.strip() for i in interests_list.split(",") if i.strip()]

    # 3. Create Fallback Response function for when API fails/missing
    def get_fallback_plan(reason: str) -> Dict[str, Any]:
        matched_ids = []
        for h in db_homestays:
            if request_data.destination.lower() in h.location.lower() or h.location.lower() in request_data.destination.lower():
                matched_ids.append(h.id)
        if not matched_ids and db_homestays:
            matched_ids = [db_homestays[0].id]

        itinerary_md = f"### 🌿 Eco-Itinerary for {request_data.destination} ({request_data.days} Days)\n\n"
        for day in range(1, request_data.days + 1):
            itinerary_md += f"#### Day {day}: Explore & Sustainable Living\n"
            itinerary_md += f"- **Morning**: Head out for a local scenic nature walk. Spot local birds and enjoy clean mountain/sea air.\n"
            itinerary_md += f"- **Afternoon**: Enjoy organic, farm-to-table traditional lunch at a sustainable village diner.\n"
            itinerary_md += f"- **Evening**: Attend a carbon-conscious community interaction or relax under the stars at your homestay.\n\n"

        return {
            "success": True,
            "itinerary": itinerary_md,
            "recommended_homestay_ids": matched_ids,
            "sustainability_tips": [
                "Always carry a reusable water bottle; avoid single-use plastics.",
                "Conserve water and turn off air conditioning/heating when leaving the room.",
                "Support the local economy by buying local handicrafts and hiring local eco-guides."
            ],
            "estimated_costs": f"Accommodation: ₹{3000 * request_data.days} | Food & Local Travel: ₹{1500 * request_data.days}",
            "note": f"Fallback mode active. Reason: {reason}"
        }

    # 4. Check if API Key is set
    api_key = settings.GEMINI_API_KEY or ""
    if not api_key:
        return get_fallback_plan("GEMINI_API_KEY is not configured in .env file.")

    # 5. Build prompt
    system_instruction = (
        "You are an expert eco-tourism travel planner and concierge for 'EcoStay AI'. "
        "Your task is to generate a custom, highly sustainable travel itinerary and recommend real homestays from the database. "
        "You MUST return your response as a valid JSON object matching this structure EXACTLY:\n"
        "{\n"
        "  \"success\": true,\n"
        "  \"itinerary\": \"Markdown formatted day-wise itinerary text\",\n"
        "  \"recommended_homestay_ids\": [list of integer IDs from the database list],\n"
        "  \"sustainability_tips\": [list of 3-5 specific local green tips],\n"
        "  \"estimated_costs\": \"budget breakdown string\"\n"
        "}\n\n"
        "Only recommend homestays that are present in the database list provided below. Match them by location or theme. "
        "Database Homestays List:\n"
        f"{json.dumps(homestays_list, indent=2)}"
    )

    user_prompt = (
        f"Generate a {request_data.days}-day eco-friendly travel plan to '{request_data.destination}'.\n"
        f"My budget is: {request_data.budget}.\n"
        f"My interests are: {', '.join(interests_list)}.\n"
    )

    # Call Google Gemini API
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    payload = {
        "contents": [
            {
                "parts": [
                    {"text": f"{system_instruction}\n\nUser request:\n{user_prompt}"}
                ]
            }
        ],
        "generationConfig": {
            "responseMimeType": "application/json"
        }
    }

    try:
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST"
        )
        # 10 second timeout for responsiveness
        with urllib.request.urlopen(req, timeout=10) as response:
            resp_data = json.loads(response.read().decode("utf-8"))
            
            # Extract text content from Gemini response
            candidate_text = resp_data['candidates'][0]['content']['parts'][0]['text']
            parsed_response = json.loads(candidate_text.strip())
            
            # Add success flag
            parsed_response["success"] = True
            parsed_response["note"] = "Live Gemini AI response"
            return parsed_response

    except urllib.error.HTTPError as e:
        error_msg = e.read().decode("utf-8") if e.fp else str(e)
        return get_fallback_plan(f"Gemini API returned HTTP {e.code}: {error_msg}")
    except json.JSONDecodeError:
        return get_fallback_plan("Failed to parse Gemini JSON output structure.")
    except Exception as e:
        return get_fallback_plan(f"Unexpected error: {str(e)}")
