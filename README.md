# 🌿 EcoStay AI

### Where Luxury Meets Sustainability

**EcoStay AI** is a premium, AI-driven hospitality platform designed to connect travelers with the most exquisite, carbon-neutral villas and sustainable escapes across India. From the sun-kissed beaches of Goa to the misty peaks of Manali, we redefine luxury by prioritizing the planet.

---

## ✨ Key Features

- **🏝️ Curated Eco-Stays**: A handpicked collection of verified luxury villas focused on sustainable architecture and zero-impact tourism.
- **🤖 AI Travel Concierge**: A personalized AI Planner that crafts intelligent itineraries based on your environmental preferences and travel style.
- **🎨 Premium Mode-Aware UI**: A high-contrast, visually stunning interface that seamlessly transitions between **Sky Blue (Light)** and **Deep Navy (Dark)** themes.
- **📱 Dashboard Experience**: Track your upcoming eco-stays and explore "AI Picks" — personalized recommendations powered by our intelligence engine.
- **🗺️ Intelligent Discovery**: Search and filter properties by destination, rating, and sustainable certifications.

---

## 📂 Project Structure

```text
ecostay-ai/
├── app/                 # Next.js Frontend (Pages & Layouts)
├── components/          # Reusable UI Components
├── backend/             # FastAPI Backend
│   ├── app/
│   │   ├── main.py      # Entry Point
│   │   ├── models/      # SQLAlchemy Models
│   │   ├── schemas/     # Pydantic Schemas
│   │   ├── routes/      # API Routes (APIRouter)
│   │   ├── services/    # Business Logic (Service Layer)
│   │   ├── middleware/  # Exception Handlers
│   │   └── database.py  # DB Configuration
│   ├── .env.example     # Environment Template
│   └── requirements.txt # Python Dependencies
├── docs/                # API Testing Collections (Postman/Thunder Client)
├── public/              # Static Assets
├── next.config.ts       # Next.js Configuration
├── package.json         # Node.js Dependencies & Scripts
├── tsconfig.json        # TypeScript Configuration
├── .gitignore          # Git Ignore Rules
└── README.md            # Project Documentation
```


---

## 📸 Visual Preview


![Villas Discovery Page](file:///C:/Users/Asus/.gemini/antigravity/brain/4fb33303-759d-4503-90a7-f63aea9fdcbe/.system_generated/click_feedback/click_feedback_1782097725743.png)
*Villas Discovery - Mode-Aware High Contrast Interface*

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom Mode-Aware Variables)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Playfair Display (Serif) & Inter (Sans)
- **Database/API**: Prototype Ready with dynamic property arrays.

---

## 🚀 Getting Started

Follow these steps to run the complete project locally:

### 1. Repository Setup
```bash
git clone https://github.com/DevkumarTarkar/Ecostay-AI.git
cd ecostay-ai
```

### 2. Frontend Setup (Next.js)
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for the UI.

### 3. Backend Setup (FastAPI)
```bash
cd backend

# Create virtual environment
python -m venv venv
# Activate venv (Windows)
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run development server
python -m uvicorn app.main:app --reload
```
API Documentation: [http://localhost:8000/docs](http://localhost:8000/docs)

### 4. Environment Variables
Ensure you have a `.env` file in the `backend/` folder with your Supabase credentials:
```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres
API_PORT=8000
```

---

## 🌍 Our Vision

By 2030, we aim to build a network of **1000+ carbon-neutral villas** across India, optimized by AI to minimize waste and energy consumption while providing unparalleled guest comfort.

---

## 📄 License

This project is licensed under the MIT License.

---

**Developed for the future of Indian Travel.** 🇮🇳🌿✨

