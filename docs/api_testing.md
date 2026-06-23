# EcoStay AI API Testing Documentation

This document provides details for testing the EcoStay AI Backend API using Postman or Thunder Client.

## Base URL
`http://localhost:8000`

## Endpoints

### 1. Get All Homestays
- **Method**: `GET`
- **URL**: `/api/homestays/`
- **Description**: Retrieves a list of all homestays.
- **Success Response**: `200 OK`

### 2. Create Homestay
- **Method**: `POST`
- **URL**: `/api/homestays/`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
    "title": "Mountain View Homestay",
    "location": "Nainital",
    "price_per_night": 2500,
    "description": "Luxury mountain stay",
    "rating": 4.8
}
```
- **Success Response**: `201 Created`

### 3. Get Homestay by ID
- **Method**: `GET`
- **URL**: `/api/homestays/{id}`
- **Description**: Retrieves a single homestay by its ID.
- **Success Response**: `200 OK`
- **Error Response**: `404 Not Found` (If homestay does not exist)

### 4. Update Homestay (Full)
- **Method**: `PUT`
- **URL**: `/api/homestays/{id}`
- **Headers**: `Content-Type: application/json`
- **Request Body**: Complete homestay object.
- **Success Response**: `200 OK`

### 5. Update Homestay (Partial)
- **Method**: `PATCH`
- **URL**: `/api/homestays/{id}`
- **Headers**: `Content-Type: application/json`
- **Request Body**: Partial homestay object (e.g., just `price_per_night`).
- **Success Response**: `200 OK`

### 6. Delete Homestay
- **Method**: `DELETE`
- **URL**: `/api/homestays/{id}`
- **Description**: Deletes a homestay by its ID.
- **Success Response**: `200 OK`

### 7. Search Homestays
- **Method**: `GET`
- **URL**: `/api/homestays/search?location=Goa`
- **Description**: Filters homestays by location.
- **Success Response**: `200 OK`

## Importing Collections

### Postman
1. Open Postman.
2. Click **Import**.
3. Select `docs/EcoStay_AI_Postman_Collection.json`.

### Thunder Client
1. Open Visual Studio Code.
2. Go to the **Thunder Client** tab.
3. Click on **Collections** -> **Import**.
4. Select `docs/EcoStay_AI_Thunder_Client_Collection.json`.
