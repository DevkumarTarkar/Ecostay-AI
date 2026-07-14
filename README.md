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
- **AI Travel Planner & Concierge** (Structured Destination, Budget, Days & Interests inputs)
- **JWT-secured Route Guards** (Redirects unauthorized users to /login)
- **OAuth Login System** (Sign in with Google or GitHub)
- Interactive Recommended Property Cards (Directly links to real database homestays)
- Real-time Backend Integration & responsive loading state alerts

### ⚙️ Backend

- FastAPI REST API
- PostgreSQL Database
- SQLAlchemy ORM
- CRUD Operations
- Search Endpoint
- **JWT Authentication** (Secure token-based user registration, login, and `/me` verification)
- **OAuth Identity Synchronization** (Google & GitHub provider mappings)
- **Google Gemini API Integration** (`gemini-1.5-flash` model for structured eco-itineraries)
- **Fail-safe Fallback Mode** (Seamless offline travel plan generation on API timeout or key absence)
- **API Rate Limiting** (Active slowapi throttling on login & register: 5 requests/min)
- Pydantic Validation & Global Exception Handling
- CORS Middleware & Swagger Documentation

---

# 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| Frontend | Next.js 14 (App Router), React, TypeScript |
| Styling | Tailwind CSS, Framer Motion, Lucide Icons |
| Backend | FastAPI (Python) |
| Database | PostgreSQL (Hosted on Supabase) |
| AI Integration | Google Gemini REST API (`gemini-1.5-flash`) |
| Auth Protocol | NextAuth.js (Frontend) & JWT / OAuth 2.0 (Backend) |
| Security | slowapi (Limiter), Passlib (Bcrypt), Python-Jose |
| ORM | SQLAlchemy |
| Validation | Pydantic v2 |
| API Testing | Postman |
| Version Control | Git & GitHub |


---
---

# 🗄️ Database

## Database Choice

This project uses **PostgreSQL** hosted on **Supabase** as the primary relational database.

## Why PostgreSQL?

- Reliable relational database
- ACID-compliant transactions
- High performance
- Easy integration with SQLAlchemy
- Cloud-hosted using Supabase
- Scalable for production applications

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

### 🏡 Homestays (CRUD)
| Method | Endpoint | Description | Access |
|---------|----------|-------------|--------|
| GET | `/api/homestays/` | Get All Homestays | Public |
| GET | `/api/homestays/{id}` | Get Homestay By ID | Public |
| POST | `/api/homestays/` | Create Homestay | Protected (Bearer JWT) |
| PUT | `/api/homestays/{id}` | Update Homestay | Protected (Bearer JWT) |
| PATCH | `/api/homestays/{id}` | Partial Update | Protected (Bearer JWT) |
| DELETE | `/api/homestays/{id}` | Delete Homestay | Protected (Bearer JWT) |
| GET | `/api/homestays/search` | Search Homestays | Public |

### 🔐 Authentication & Session
| Method | Endpoint | Description | Details |
|---------|----------|-------------|---------|
| POST | `/api/auth/register` | Register New User | Bcrypt encryption + slowapi Rate Limiting |
| POST | `/api/auth/login` | Authenticate & Issue JWT | Returns Access Token + slowapi Rate Limiting |
| GET | `/api/auth/me` | Fetch Current Session | Protected (Bearer JWT) |
| POST | `/api/auth/oauth` | Sync OAuth Provider State | Syncs Google/GitHub account logins |

### 🧠 Artificial Intelligence
| Method | Endpoint | Description | Model |
|---------|----------|-------------|-------|
| POST | `/api/ai/travel-plan` | Generate Travel Itinerary | Google Gemini (`gemini-1.5-flash`) |

---


## Database Integration

All API endpoints perform CRUD operations directly on the PostgreSQL database using SQLAlchemy ORM.

Implemented Endpoints:

- ✅ Get All Homestays
- ✅ Get Homestay by ID
- ✅ Create Homestay
- ✅ Update Homestay
- ✅ Partial Update
- ✅ Delete Homestay
- ✅ Search Homestays

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

## 3️⃣ How to run backend locally

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

### ⚙️ Backend Environment Config (`backend/.env`)
Create a `.env` file inside the `backend/` folder:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/ecostay_db
API_PORT=8000
JWT_SECRET=your_jwt_secret_key_here
ACCESS_TOKEN_EXPIRE_MINUTES=10080
GEMINI_API_KEY=your_gemini_api_key_here
```

### 🌐 Frontend Environment Config (`.env.local`)
Create a `.env.local` file inside the root directory:
```env
# API Endpoint
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# NextAuth Config
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Google OAuth API Keys
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth API Keys
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

---

---

# ⚙️ Set Up Database

1. Create a PostgreSQL database (Supabase or local PostgreSQL).

2. Create a `.env` file inside the `backend` folder.

```env
DATABASE_URL=your_database_url
API_PORT=8000
```

3. Install dependencies

```bash
pip install -r requirements.txt
```

4. Start the backend

```bash
uvicorn app.main:app --reload
```

The API will be available at:

```
http://localhost:8000
```

---
# 🗂️ Database Schema

The database schema used in this project is shown below.

![Database Schema](docs/schema-diagram.png)

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

https://www.linkedin.com/in/dev-kumar-tarkar-55189731a/

---

# ⭐ Support

If you like this project, don't forget to **Star ⭐ the repository.**

---

<p align="center">
Made with ❤️ using Next.js, FastAPI & PostgreSQL
</p>
