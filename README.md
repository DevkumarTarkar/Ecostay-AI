# 🌿 EcoStay AI

<p align="center">
  <b>AI-Powered Eco Tourism & Homestay Booking Platform</b><br>
  Discover sustainable stays across India with a modern full-stack web application.
</p>

---

## 📖 About The Project

EcoStay AI is a full-stack web application developed to simplify the discovery of eco-friendly villas and homestays across India.

The platform combines a modern **Next.js** frontend with a **FastAPI REST API** backend and **PostgreSQL** database. Users can browse properties, search destinations, and interact with dynamic data fetched directly from the backend.

---

## ✨ Features

### 🌐 Frontend

- Modern Responsive UI
- Light & Dark Mode
- Featured Properties Section
- Villas Discovery Page
- Search Properties
- AI Planner Interface
- Dashboard UI
- Dynamic Property Cards
- Real-time Backend Integration

### ⚙️ Backend

- FastAPI REST API
- PostgreSQL Database
- SQLAlchemy ORM
- CRUD Operations
- Search Endpoint
- RESTful API Design
- Pydantic Validation
- Global Exception Handling
- CORS Middleware
- Swagger Documentation

---

# 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| Frontend | Next.js 14, React, TypeScript |
| Styling | Tailwind CSS |
| Backend | FastAPI |
| Database | PostgreSQL |
| ORM | SQLAlchemy |
| Validation | Pydantic |
| API Testing | Postman |
| Version Control | Git & GitHub |

---

# 📂 Project Structure

```text
Ecostay-AI
│
├── app/
│   ├── about/
│   ├── dashboard/
│   ├── login/
│   ├── villas/
│   └── page.tsx
│
├── backend/
│   ├── app/
│   │
│   ├── middleware/
│   │   └── exception_handler.py
│   │
│   ├── models/
│   │   └── homestay.py
│   │
│   ├── routes/
│   │   └── homestay_routes.py
│   │
│   ├── schemas/
│   │   ├── homestay.py
│   │   └── response.py
│   │
│   ├── services/
│   │   └── homestay_service.py
│   │
│   ├── utils/
│   │
│   ├── config.py
│   ├── database.py
│   ├── main.py
│   │
│   ├── .env.example
│   ├── .gitignore
│   └── requirements.txt
│
├── components/
├── docs/
├── public/
├── README.md
├── package.json
├── next.config.ts
└── tsconfig.json
```

---

# 🚀 REST API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/homestays/` | Get All Homestays |
| GET | `/api/homestays/{id}` | Get Homestay By ID |
| POST | `/api/homestays/` | Create Homestay |
| PUT | `/api/homestays/{id}` | Update Homestay |
| PATCH | `/api/homestays/{id}` | Partial Update |
| DELETE | `/api/homestays/{id}` | Delete Homestay |
| GET | `/api/homestays/search` | Search Homestays |

---

# 🚀 Getting Started

## 1️⃣ Clone Repository

```bash
git clone https://github.com/DevkumarTarkar/Ecostay-AI.git

cd Ecostay-AI
```

---

## 2️⃣ Frontend Setup

```bash
npm install

npm run dev
```

Frontend runs at

```
http://localhost:3000
```

---

## 3️⃣ Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python -m uvicorn app.main:app --reload
```

Backend runs at

```
http://localhost:8000
```

Swagger Documentation

```
http://localhost:8000/docs
```

---

# 🔐 Environment Variables

Create a `.env` file inside the **backend** folder.

```env
DATABASE_URL=your_database_url
```

Refer to `.env.example` for the required environment variables.

---

# 📸 Project Screenshots

### 🏠 Home Page

> Add Home Page Screenshot Here

---

### 🏡 Villas Page

> Add Villas Page Screenshot Here

---

### 📑 Swagger API

> Add Swagger Screenshot Here

---

### 🌐 Frontend Connected to Backend

> Add Network Tab Screenshot Here

---

# 👨‍💻 Developer

### Dev Kumar Tarkar

**B.Tech CSE (Artificial Intelligence & Machine Learning)**

GLA University, Mathura

GitHub

https://github.com/DevkumarTarkar

LinkedIn

https://www.linkedin.com/

---

# ⭐ Support

If you like this project, don't forget to **Star ⭐ the repository.**

---

<p align="center">
Made with ❤️ using Next.js, FastAPI & PostgreSQL
</p>
