from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..schemas.homestay import Homestay, HomestayCreate, HomestayUpdate
from ..schemas.response import SuccessResponse, ErrorResponse
from ..services.homestay_service import HomestayService

router = APIRouter(prefix="/homestays", tags=["homestays"])

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
def create_homestay(homestay_data: HomestayCreate, db: Session = Depends(get_db)):
    homestay = HomestayService.create(db, homestay_data)
    return SuccessResponse(message="Homestay created successfully", data=homestay)

@router.put("/{id}", response_model=SuccessResponse[Homestay])
def update_homestay(id: int, homestay_data: HomestayUpdate, db: Session = Depends(get_db)):
    homestay = HomestayService.update(db, id, homestay_data)
    if not homestay:
        raise HTTPException(status_code=404, detail="Resource not found")
    return SuccessResponse(message="Homestay updated successfully", data=homestay)

@router.patch("/{id}", response_model=SuccessResponse[Homestay])
def partial_update_homestay(id: int, homestay_data: HomestayUpdate, db: Session = Depends(get_db)):
    homestay = HomestayService.update(db, id, homestay_data)
    if not homestay:
        raise HTTPException(status_code=404, detail="Resource not found")
    return SuccessResponse(message="Homestay partially updated successfully", data=homestay)

@router.delete("/{id}", response_model=SuccessResponse)
def delete_homestay(id: int, db: Session = Depends(get_db)):
    success = HomestayService.delete(db, id)
    if not success:
        raise HTTPException(status_code=404, detail="Resource not found")
    return SuccessResponse(message="Homestay deleted successfully")
