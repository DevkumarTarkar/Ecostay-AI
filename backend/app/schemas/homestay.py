from pydantic import BaseModel, ConfigDict, Field
from datetime import datetime
from typing import Optional, List

class PhotoResponse(BaseModel):
    url: str
    caption: Optional[str] = None

class HomestayBase(BaseModel):
    title: str
    location: str
    price_per_night: float
    description: Optional[str] = None
    rating: Optional[float] = 0.0
    reviews_count: Optional[int] = 0
    guests: Optional[int] = 1
    bedrooms: Optional[int] = 1
    bathrooms: Optional[int] = 1
    sustainability_level: Optional[str] = "Level 1"
    amenities: Optional[List[str]] = Field(default_factory=list)
    featured_photo: Optional[str] = None

class HomestayCreate(HomestayBase):
    pass

class HomestayUpdate(BaseModel):
    title: Optional[str] = None
    location: Optional[str] = None
    price_per_night: Optional[float] = None
    description: Optional[str] = None
    rating: Optional[float] = None
    reviews_count: Optional[int] = None
    guests: Optional[int] = None
    bedrooms: Optional[int] = None
    bathrooms: Optional[int] = None
    sustainability_level: Optional[str] = None
    amenities: Optional[List[str]] = None
    featured_photo: Optional[str] = None

class Homestay(HomestayBase):
    id: int
    photos: Optional[List[str]] = Field(default_factory=list)
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)
