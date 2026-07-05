import uvicorn
import os
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .routes import homestay_routes
from .middleware.exception_handler import exception_handler
from .database import engine, Base

# Create database tables
Base.metadata.create_all(bind=engine)

# Create uploads directory if it doesn't exist
UPLOADS_DIR = "uploads"
if not os.path.exists(UPLOADS_DIR):
    os.makedirs(UPLOADS_DIR)

app = FastAPI(title="EcoStay AI API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files for image uploads
app.mount("/uploads", StaticFiles(directory=UPLOADS_DIR), name="uploads")

# Register Routes
app.include_router(homestay_routes.router, prefix="/api")

# Centralized Exception Handling
@app.exception_handler(Exception)
async def common_exception_handler(request: Request, exc: Exception):
    return await exception_handler(request, exc)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=400,
        content={
            "success": False,
            "message": "Validation Error",
            "errors": exc.errors()
        }
    )

@app.get("/")
def read_root():
    return {"message": "Welcome to EcoStay AI Backend API"}

if __name__ == "__main__":
    from .config import settings
    uvicorn.run("app.main:app", host="0.0.0.0", port=settings.API_PORT, reload=True)
