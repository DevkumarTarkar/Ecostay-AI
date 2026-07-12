# EcoStay AI - CRUD Setup & Quick Start Guide

## What's Been Updated

Your backend now supports **complete CRUD operations** for villas with full **photo/image management**:

✅ **Full CRUD Operations:**
- Create new villas/homestays
- Read all villas or search by location
- Update villa details (full or partial)
- Delete villas

✅ **Photo Management:**
- Upload multiple photos per villa
- Set featured/cover photos
- Delete specific photos
- Store photos locally in `uploads/` directory

✅ **Enhanced Villa Data:**
- Guests count
- Bedrooms/Bathrooms
- Sustainability level
- Amenities list
- Rating & review count
- Multiple photos storage

---

## Installation & Setup

### 1. **Install Dependencies**
```bash
cd backend
pip install -r requirements.txt
```

New packages added:
- `pillow==10.1.0` - Image processing

### 2. **Create Uploads Directory**
The directory is created automatically when the backend starts, but you can create it manually:

```bash
mkdir uploads
```

### 3. **Configure Database**
Ensure your `.env` file has:
```
DATABASE_URL=postgresql://user:password@localhost:5432/ecostay_db
API_PORT=8000
```

### 4. **Start Backend Server**
```bash
cd backend
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Server will run at: `http://localhost:8000`
- API: `http://localhost:8000/api`
- Docs: `http://localhost:8000/docs` (Swagger UI)
- ReDoc: `http://localhost:8000/redoc`

---

## How to Use with Postman

### Step 1: Import Postman Collection
1. Open Postman
2. Click **Import** → **Upload Files**
3. Select: `docs/EcoStay_AI_CRUD_Collection.json`
4. Collection imported with all endpoints!

### Step 2: Set Environment Variable
1. Click **Environments** → Create New
2. Add variable:
   - **Name:** `BASE_URL`
   - **Value:** `http://localhost:8000/api`
3. Select this environment before making requests

### Step 3: Use the Endpoints

---

## Complete Workflow in Postman

### **Example 1: Add a New Villa**

**Request:** POST `/homestays`
```json
{
  "title": "Mountain View Homestay",
  "location": "Manali, Himachal Pradesh",
  "price_per_night": 5000,
  "description": "Experience the majestic Himalayas...",
  "rating": 4.9,
  "reviews_count": 128,
  "guests": 4,
  "bedrooms": 2,
  "bathrooms": 2,
  "sustainability_level": "Level 3",
  "amenities": ["Starlink Wifi", "Organic Coffee", "24/7 Security", "Renewable Energy"]
}
```

**Response:** Returns the newly created villa with ID (e.g., `id: 1`)

---

### **Example 2: Upload Photos**

1. **Upload First Photo (Featured):**
   - **Request:** POST `/homestays/1/upload-photo?is_featured=true`
   - **Body:** form-data with `file` key
   - **Select:** Any image file from your computer
   - **Response:** `/uploads/1_20240630_143022_villa.jpg`

2. **Upload More Photos:**
   - **Request:** POST `/homestays/1/upload-photo`
   - Repeat for multiple photos

---

### **Example 3: View Villa with All Photos**

**Request:** GET `/homestays/1`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Mountain View Homestay",
    "location": "Manali",
    "price_per_night": 5000,
    "guests": 4,
    "bedrooms": 2,
    "bathrooms": 2,
    "sustainability_level": "Level 3",
    "amenities": ["Starlink Wifi", "Organic Coffee", "24/7 Security", "Renewable Energy"],
    "featured_photo": "/uploads/1_20240630_143022_villa.jpg",
    "photos": [
      "/uploads/1_20240630_143022_villa.jpg",
      "/uploads/1_20240630_143055_interior.jpg",
      "/uploads/1_20240630_143100_garden.jpg"
    ]
  }
}
```

---

### **Example 4: Update Villa**

**Partial Update (PATCH):**
- **Request:** PATCH `/homestays/1`
- **Body:** Only the fields to update
```json
{
  "price_per_night": 5500,
  "rating": 4.95
}
```

**Full Update (PUT):**
- **Request:** PUT `/homestays/1`
- **Body:** All fields including new amenities

---

### **Example 5: Search by Location**

**Request:** GET `/homestays/search?location=Manali`

**Response:** All homestays in Manali

---

### **Example 6: Delete Photo**

**Request:** DELETE `/homestays/1/photos/0`
- Deletes photo at index 0 (first photo)
- File automatically removed from `uploads/` directory

---

### **Example 7: Set Different Featured Photo**

**Request:** PUT `/homestays/1/photos/1/set-featured`
- Sets photo at index 1 as the featured photo

---

### **Example 8: Delete Entire Villa**

**Request:** DELETE `/homestays/1`
- Removes villa from database
- Photos remain in uploads folder (manual cleanup if needed)

---

## API Response Format

### ✅ Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ...actual data... }
}
```

### ❌ Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": { ...error details... }
}
```

---

## Postman Tips

### Save Time with Variables
In collection requests, use:
- `{{BASE_URL}}/homestays` - Instead of full URL
- `{{HOMESTAY_ID}}` - For villa ID (change as needed)
- `{{PHOTO_INDEX}}` - For photo index

### Test Data Quickly
1. Create villa → Copy ID from response
2. Upload photo → Note photo URL
3. Update villa → Use fetched data
4. Delete items → Clean up test data

### View Raw Responses
Click "Raw" button in Postman response to see exact JSON

### Use Pre-request Scripts
Set variables before requests (optional automation)

---

## File Structure

```
backend/
├── app/
│   ├── main.py                 # ✅ Updated - serves uploads
│   ├── models/
│   │   └── homestay.py         # ✅ Updated - new fields
│   ├── routes/
│   │   └── homestay_routes.py  # ✅ Updated - photo endpoints
│   ├── schemas/
│   │   └── homestay.py         # ✅ Updated - new schemas
│   ├── services/
│   │   └── homestay_service.py # ✅ Updated - handles photos
│   └── ...
├── uploads/                    # 🆕 Created automatically
│   ├── 1_20240630_143022_villa.jpg
│   ├── 1_20240630_143055_interior.jpg
│   └── ...
├── requirements.txt            # ✅ Updated - added pillow
└── .gitignore                  # ✅ Updated - ignores uploads/
```

---

## Database Schema

### Homestays Table
```sql
CREATE TABLE homestays (
    id INTEGER PRIMARY KEY,
    title VARCHAR(255),
    location VARCHAR(255),
    price_per_night FLOAT,
    description TEXT,
    rating FLOAT DEFAULT 0.0,
    reviews_count INTEGER DEFAULT 0,
    guests INTEGER DEFAULT 1,
    bedrooms INTEGER DEFAULT 1,
    bathrooms INTEGER DEFAULT 1,
    sustainability_level VARCHAR(50),
    amenities JSON,
    photos JSON (array of URLs),
    featured_photo VARCHAR(500),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

---

## Troubleshooting

### ❌ **Uploads folder not creating**
- Create manually: `mkdir uploads`
- Check folder permissions

### ❌ **Photo upload fails**
- Ensure file format is: jpg, jpeg, png, gif, webp
- Check file size (default max 25MB)
- Verify `uploads/` folder exists

### ❌ **404 Not Found on GET**
- Verify villa ID exists: `GET /homestays` to see all
- Use correct ID in URL

### ❌ **Can't see uploaded photos**
- Check if files exist in `uploads/` directory
- Verify URL path in response

### ❌ **Database connection error**
- Check `.env` file configuration
- Ensure PostgreSQL is running
- Verify database name and credentials

---

## Next Steps

1. ✅ Start backend server
2. ✅ Import Postman collection
3. ✅ Create a test villa
4. ✅ Upload test photos
5. ✅ Try CRUD operations
6. ✅ Connect to frontend (Next.js)

---

## API Documentation Files

- **Complete Guide:** `docs/API_CRUD_GUIDE.md`
- **Postman Collection:** `docs/EcoStay_AI_CRUD_Collection.json`
- **This File:** `docs/SETUP_GUIDE.md`

---

## Support

For questions or issues:
1. Check the detailed API guide
2. Review Swagger docs at `http://localhost:8000/docs`
3. Check backend logs for errors

---

**Happy CRUD operations! 🚀**
