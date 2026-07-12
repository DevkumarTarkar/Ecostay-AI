from fastapi import APIRouter, Depends, HTTPException, Query, status, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
import os
import shutil
from datetime import datetime
from ..database import get_db
from ..schemas.homestay import Homestay, HomestayCreate, HomestayUpdate
from ..schemas.response import SuccessResponse, ErrorResponse
from ..services.homestay_service import HomestayService
from ..dependencies.auth import get_current_user
from ..models.user import User


router = APIRouter(prefix="/homestays", tags=["homestays"])

UPLOADS_DIR = "uploads"
ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png", "gif", "webp"}

def allowed_file(filename: str) -> bool:
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@router.get("/", response_model=SuccessResponse[List[Homestay]])
def get_homestays(db: Session = Depends(get_db)):
    homestays = HomestayService.get_all(db)
    return SuccessResponse(data=homestays)

@router.get("/search", response_model=SuccessResponse[List[Homestay]])
def search_homestays(location: str = Query(..., description="Location to search for"), db: Session = Depends(get_db)):
    homestays = HomestayService.get_all(db, location=location)
    return SuccessResponse(data=homestays)

@router.get("/{id}", response_model=SuccessResponse[Homestay])
def get_homestay(id: int, db: Session = Depends(get_db)):
    homestay = HomestayService.get_by_id(db, id)
    if not homestay:
        raise HTTPException(status_code=404, detail="Resource not found")
    return SuccessResponse(data=homestay)

@router.post("/", response_model=SuccessResponse[Homestay], status_code=status.HTTP_201_CREATED)
def create_homestay(homestay_data: HomestayCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):

    homestay = HomestayService.create(db, homestay_data)
    return SuccessResponse(message="Homestay created successfully", data=homestay)

@router.put("/{id}", response_model=SuccessResponse[Homestay])
def update_homestay(id: int, homestay_data: HomestayUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):

    homestay = HomestayService.update(db, id, homestay_data)
    if not homestay:
        raise HTTPException(status_code=404, detail="Resource not found")
    return SuccessResponse(message="Homestay updated successfully", data=homestay)

@router.patch("/{id}", response_model=SuccessResponse[Homestay])
def partial_update_homestay(id: int, homestay_data: HomestayUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):

    homestay = HomestayService.update(db, id, homestay_data)
    if not homestay:
        raise HTTPException(status_code=404, detail="Resource not found")
    return SuccessResponse(message="Homestay partially updated successfully", data=homestay)

@router.delete("/{id}", response_model=SuccessResponse)
def delete_homestay(id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):

    success = HomestayService.delete(db, id)
    if not success:
        raise HTTPException(status_code=404, detail="Resource not found")
    return SuccessResponse(message="Homestay deleted successfully")

# Photo Upload Endpoints
@router.post("/{id}/upload-photo", response_model=SuccessResponse[dict])
async def upload_photo(
    id: int,
    file: UploadFile = File(...),
    is_featured: bool = False,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Upload a photo for a homestay"""
    homestay = HomestayService.get_by_id(db, id)
    if not homestay:
        raise HTTPException(status_code=404, detail="Homestay not found")
    
    if not allowed_file(file.filename):
        raise HTTPException(status_code=400, detail="Invalid file type. Allowed: jpg, jpeg, png, gif, webp")
    
    try:
        # Create unique filename
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{id}_{timestamp}_{file.filename}"
        file_path = os.path.join(UPLOADS_DIR, filename)
        
        # Save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Store in database
        photo_url = f"/uploads/{filename}"
        if not homestay.photos:
            homestay.photos = []
        homestay.photos.append(photo_url)
        
        if is_featured:
            homestay.featured_photo = photo_url
        
        db.commit()
        db.refresh(homestay)
        
        return SuccessResponse(
            message="Photo uploaded successfully",
            data={"photo_url": photo_url, "is_featured": is_featured}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

@router.delete("/{id}/photos/{photo_index}", response_model=SuccessResponse)
async def delete_photo(id: int, photo_index: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Delete a specific photo from a homestay"""
    homestay = HomestayService.get_by_id(db, id)
    if not homestay:
        raise HTTPException(status_code=404, detail="Homestay not found")
    
    if not homestay.photos or photo_index >= len(homestay.photos):
        raise HTTPException(status_code=404, detail="Photo not found")
    
    try:
        photo_url = homestay.photos[photo_index]
        
        # Delete file from disk
        file_path = photo_url.replace("/uploads/", "")
        full_path = os.path.join(UPLOADS_DIR, file_path)
        if os.path.exists(full_path):
            os.remove(full_path)
        
        # Remove from list
        homestay.photos.pop(photo_index)
        
        # If it was featured, clear featured photo
        if homestay.featured_photo == photo_url:
            homestay.featured_photo = None
        
        db.commit()
        return SuccessResponse(message="Photo deleted successfully")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Deletion failed: {str(e)}")

@router.put("/{id}/photos/{photo_index}/set-featured", response_model=SuccessResponse)
async def set_featured_photo(id: int, photo_index: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Set a photo as the featured photo"""
    homestay = HomestayService.get_by_id(db, id)
    if not homestay:
        raise HTTPException(status_code=404, detail="Homestay not found")
    
    if not homestay.photos or photo_index >= len(homestay.photos):
        raise HTTPException(status_code=404, detail="Photo not found")
    
    homestay.featured_photo = homestay.photos[photo_index]
    db.commit()
    db.refresh(homestay)
    
    return SuccessResponse(
        message="Featured photo set successfully",
        data={"featured_photo": homestay.featured_photo}
    )
