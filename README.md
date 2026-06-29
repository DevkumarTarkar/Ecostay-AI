````markdown
# 🌿 EcoStay AI

## Where Luxury Meets Sustainability

**EcoStay AI** is a full-stack AI-powered hospitality platform designed to connect travelers with luxury eco-friendly villas and sustainable homestays across India. Built with **Next.js**, **FastAPI**, and **PostgreSQL**, the platform offers a modern user experience with a scalable REST API backend for managing homestay listings.

---

## ✨ Key Features

### 🌍 Frontend

- Modern UI built with Next.js 14
- Responsive design using Tailwind CSS
- Light & Dark Mode Support
- Featured Properties
- Villas Discovery Page
- Dynamic Property Cards
- AI Planner Interface
- Dashboard UI
- Real-time data fetched from FastAPI Backend

### ⚙️ Backend

- FastAPI REST API
- PostgreSQL Database Integration
- SQLAlchemy ORM
- CRUD Operations
- Search Endpoint
- Pydantic Validation
- Exception Handling Middleware
- CORS Middleware
- Interactive Swagger Documentation

---

## 🛠️ Tech Stack

### Frontend

- Next.js 14 (App Router)
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

### Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic
- Uvicorn

### Tools

- Git & GitHub
- Postman
- VS Code

---

## 📂 Project Structure

```text
ecostay-ai/
├── app/                     # Next.js Frontend
├── components/              # Reusable UI Components
├── backend/
│   ├── app/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── config.py
│   │   ├── database.py
│   │   └── main.py
│   ├── .env.example
│   ├── requirements.txt
│   └── .gitignore
├── docs/
├── public/
├── package.json
├── next.config.ts
├── tsconfig.json
├── README.md
└── .gitignore
```

---

## 📸 Project Preview

> Replace the placeholder below with your project screenshots after uploading them to the repository.

```md
![Homepage](docs/screenshots/homepage.png)

![Villas Page](docs/screenshots/villas.png)
```

---

## 🚀 Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/DevkumarTarkar/Ecostay-AI.git

cd Ecostay-AI
```

---

## Frontend Setup

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

# How to Run Backend Locally

Navigate to backend folder

```bash
cd backend
```

Create virtual environment

```bash
python -m venv venv
```

Activate virtual environment (Windows)

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Create a `.env` file using `.env.example`.

Run FastAPI Server

```bash
python -m uvicorn app.main:app --reload
```

Backend URL

```
http://localhost:8000
```

Swagger Documentation

```
http://localhost:8000/docs
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend` folder.

```env
DATABASE_URL=postgresql://username:password@localhost:5432/postgres

API_PORT=8000
```

---

## 🌐 REST API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/homestays/` | Retrieve all homestays |
| GET | `/api/homestays/{id}` | Retrieve a homestay by ID |
| POST | `/api/homestays/` | Create a new homestay |
| PUT | `/api/homestays/{id}` | Update a homestay |
| PATCH | `/api/homestays/{id}` | Partially update a homestay |
| DELETE | `/api/homestays/{id}` | Delete a homestay |
| GET | `/api/homestays/search` | Search homestays by location |

---

## ⚙️ Backend Features

- RESTful API built with FastAPI
- PostgreSQL Database Integration
- SQLAlchemy ORM
- CRUD Operations
- Search Endpoint
- Global Exception Handling
- CORS Middleware
- Standardized JSON Responses
- Interactive Swagger API Documentation

---

## 📦 Sample API Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": [
    {
      "id": 1,
      "title": "Mountain View Homestay",
      "location": "Manali",
      "price_per_night": 8500,
      "rating": 4.8
    }
  ]
}
```


## 🌍 Future Scope

- AI Recommendation Engine
- User Authentication
- Online Booking
- Payment Gateway
- Wishlist
- Reviews & Ratings
- Admin Dashboard
- Image Upload Support

---

## 👨‍💻 Developer

**Dev Kumar Tarkar**

B.Tech CSE (Artificial Intelligence & Machine Learning)

GLA University, Mathura

GitHub: https://github.com/DevkumarTarkar

---

## 📄 License

This project is licensed under the **MIT License**.

---

⭐ If you found this project helpful, consider giving it a star on GitHub.
````
