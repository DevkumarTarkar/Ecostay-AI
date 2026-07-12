# EcoStay AI - Complete CRUD API Guide

## Base URL
```
http://localhost:8000/api
```

---

## **HOMESTAY/VILLA MANAGEMENT ENDPOINTS**

### 1. **GET All Homestays**
- **Endpoint:** `GET /homestays`
- **Description:** Retrieve all homestays
- **Response:** List of all homestays with photos

**cURL Example:**
```bash
curl -X GET "http://localhost:8000/api/homestays"
```

**Postman Setup:**
- Method: GET
- URL: `{{BASE_URL}}/homestays`
- No body needed

---

### 2. **GET Homestay by ID**
- **Endpoint:** `GET /homestays/{id}`
- **Description:** Get details of a specific homestay
- **Parameters:** `id` (path parameter - integer)

**cURL Example:**
```bash
curl -X GET "http://localhost:8000/api/homestays/1"
```

**Postman Setup:**
- Method: GET
- URL: `{{BASE_URL}}/homestays/1`

---

### 3. **SEARCH Homestays by Location**
- **Endpoint:** `GET /homestays/search?location={location}`
- **Description:** Search homestays by location
- **Query Parameters:** `location` (string, required)

**cURL Example:**
```bash
curl -X GET "http://localhost:8000/api/homestays/search?location=Manali"
```

**Postman Setup:**
- Method: GET
- URL: `{{BASE_URL}}/homestays/search`
- Params tab: 
  - Key: `location`
  - Value: `Manali`

---

### 4. **CREATE New Homestay**
- **Endpoint:** `POST /homestays`
- **Description:** Create a new homestay
- **Status Code:** 201 (Created)

**Request Body:**
```json
{
  "title": "Mountain View Homestay",
  "location": "Manali, Himachal Pradesh",
  "price_per_night": 5000,
  "description": "Experience the majestic Himalayas from this eco-certified homestay...",
  "rating": 4.9,
  "reviews_count": 128,
  "guests": 4,
  "bedrooms": 2,
  "bathrooms": 2,
  "sustainability_level": "Level 3",
  "amenities": ["Starlink Wifi", "Organic Coffee", "24/7 Security", "Renewable Energy", "Local Guide"]
}
```

**cURL Example:**
```bash
curl -X POST "http://localhost:8000/api/homestays" \
  -H "Content-Type: application/json" \
  -d '{
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
    "amenities": ["Starlink Wifi", "Organic Coffee", "24/7 Security", "Renewable Energy", "Local Guide"]
  }'
```

**Postman Setup:**
- Method: POST
- URL: `{{BASE_URL}}/homestays`
- Body: raw JSON (paste the request body above)

---

### 5. **UPDATE Homestay (Full Update)**
- **Endpoint:** `PUT /homestays/{id}`
- **Description:** Update all fields of a homestay
- **Parameters:** `id` (path parameter - integer)

**Request Body:** (Same as CREATE, all fields)
```json
{
  "title": "Updated Mountain View Homestay",
  "location": "Manali, Himachal Pradesh",
  "price_per_night": 5500,
  "description": "Updated description...",
  "rating": 4.95,
  "reviews_count": 150,
  "guests": 4,
  "bedrooms": 2,
  "bathrooms": 2,
  "sustainability_level": "Level 3 Sustainability",
  "amenities": ["Starlink Wifi", "Organic Coffee", "24/7 Security", "Renewable Energy", "Local Guide", "Pool"]
}
```

**cURL Example:**
```bash
curl -X PUT "http://localhost:8000/api/homestays/1" \
  -H "Content-Type: application/json" \
  -d '{...request body...}'
```

**Postman Setup:**
- Method: PUT
- URL: `{{BASE_URL}}/homestays/1`
- Body: raw JSON

---

### 6. **PARTIAL UPDATE Homestay (Patch)**
- **Endpoint:** `PATCH /homestays/{id}`
- **Description:** Update specific fields only
- **Parameters:** `id` (path parameter - integer)

**Request Body:** (Only the fields you want to update)
```json
{
  "price_per_night": 5200,
  "rating": 4.92,
  "amenities": ["Starlink Wifi", "Organic Coffee", "24/7 Security", "Renewable Energy", "Local Guide", "Yoga Classes"]
}
```

**cURL Example:**
```bash
curl -X PATCH "http://localhost:8000/api/homestays/1" \
  -H "Content-Type: application/json" \
  -d '{
    "price_per_night": 5200,
    "rating": 4.92
  }'
```

**Postman Setup:**
- Method: PATCH
- URL: `{{BASE_URL}}/homestays/1`
- Body: raw JSON (only fields to update)

---

### 7. **DELETE Homestay**
- **Endpoint:** `DELETE /homestays/{id}`
- **Description:** Delete a homestay completely
- **Parameters:** `id` (path parameter - integer)

**cURL Example:**
```bash
curl -X DELETE "http://localhost:8000/api/homestays/1"
```

**Postman Setup:**
- Method: DELETE
- URL: `{{BASE_URL}}/homestays/1`
- No body needed

---

## **PHOTO/IMAGE MANAGEMENT ENDPOINTS**

### 8. **UPLOAD Photo for Homestay**
- **Endpoint:** `POST /homestays/{id}/upload-photo`
- **Description:** Upload a photo for a homestay
- **Parameters:** 
  - `id` (path parameter - integer)
  - `file` (form-data, required) - Image file
  - `is_featured` (query parameter, optional, boolean) - Set as featured photo

**Supported Formats:** jpg, jpeg, png, gif, webp

**cURL Example:**
```bash
curl -X POST "http://localhost:8000/api/homestays/1/upload-photo?is_featured=true" \
  -F "file=@/path/to/image.jpg"
```

**Postman Setup:**
- Method: POST
- URL: `{{BASE_URL}}/homestays/1/upload-photo?is_featured=true`
- Body:
  - Type: form-data
  - Key: `file`
  - Value: Select file from computer
- Query Params (optional):
  - Key: `is_featured`
  - Value: `true` or `false`

**Response Example:**
```json
{
  "success": true,
  "message": "Photo uploaded successfully",
  "data": {
    "photo_url": "/uploads/1_20240630_143022_villa.jpg",
    "is_featured": true
  }
}
```

---

### 9. **DELETE Photo from Homestay**
- **Endpoint:** `DELETE /homestays/{id}/photos/{photo_index}`
- **Description:** Delete a specific photo
- **Parameters:**
  - `id` (path parameter - homestay ID)
  - `photo_index` (path parameter - index of photo in array, starts at 0)

**cURL Example:**
```bash
curl -X DELETE "http://localhost:8000/api/homestays/1/photos/0"
```

**Postman Setup:**
- Method: DELETE
- URL: `{{BASE_URL}}/homestays/1/photos/0`

---

### 10. **SET Featured Photo**
- **Endpoint:** `PUT /homestays/{id}/photos/{photo_index}/set-featured`
- **Description:** Set a specific photo as the featured/cover photo
- **Parameters:**
  - `id` (path parameter - homestay ID)
  - `photo_index` (path parameter - index of photo to set as featured)

**cURL Example:**
```bash
curl -X PUT "http://localhost:8000/api/homestays/1/photos/1/set-featured"
```

**Postman Setup:**
- Method: PUT
- URL: `{{BASE_URL}}/homestays/1/photos/1/set-featured`

---

## **COMPLETE WORKFLOW EXAMPLE**

### Step 1: Create a New Homestay
```
POST /homestays
Body: {homestay data}
Returns: {homestay with id}
```

### Step 2: Upload Photos
```
POST /homestays/1/upload-photo?is_featured=true
Body: form-data with file
```

```
POST /homestays/1/upload-photo
Body: form-data with file
```

### Step 3: View Homestay with Photos
```
GET /homestays/1
Returns: {homestay with photos array}
```

### Step 4: Update Homestay Details
```
PATCH /homestays/1
Body: {updated fields}
```

### Step 5: Set Different Featured Photo
```
PUT /homestays/1/photos/1/set-featured
```

### Step 6: Delete a Photo
```
DELETE /homestays/1/photos/0
```

### Step 7: Delete Entire Homestay
```
DELETE /homestays/1
```

---

## **POSTMAN ENVIRONMENT VARIABLES**

Set these in your Postman Environment:

```
{
  "BASE_URL": "http://localhost:8000/api",
  "HOMESTAY_ID": "1",
  "PHOTO_INDEX": "0"
}
```

Then use in requests:
- `{{BASE_URL}}/homestays`
- `{{BASE_URL}}/homestays/{{HOMESTAY_ID}}`

---

## **RESPONSE FORMAT**

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {...}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": {...}
}
```

---

## **STATUS CODES**

- **200 OK** - Successful GET, PUT, PATCH
- **201 Created** - Successful POST
- **204 No Content** - Successful DELETE
- **400 Bad Request** - Invalid file type, validation error
- **404 Not Found** - Resource doesn't exist
- **500 Internal Server Error** - Server error

---

## **QUICK POSTMAN SETUP**

1. **Create Collection:** "EcoStay API"
2. **Add Environment Variables:**
   - BASE_URL: http://localhost:8000/api

3. **Import all endpoints** from this guide

4. **Test Workflow:**
   - Create homestay → Get ID
   - Upload photos → Note photo URLs
   - Update homestay
   - Delete items
   - Search by location

---

## **NOTES**

- Photos are stored in `backend/uploads/` directory
- Photo URLs follow pattern: `/uploads/{homestay_id}_{timestamp}_{filename}`
- Photos array in response contains all photo URLs
- Max file size depends on FastAPI configuration (default 25MB)
- All timestamps in ISO 8601 format
