from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional

class HomestayBase(BaseModel):
    title: str
    location: str
    price_per_night: float
    description: Optional[str] = None
    rating: Optional[float] = 0.0

class HomestayCreate(HomestayBase):
    pass

class HomestayUpdate(BaseModel):
    title: Optional[str] = None
    location: Optional[str] = None
    price_per_night: Optional[float] = None
    description: Optional[str] = None
    rating: Optional[float] = None

class Homestay(HomestayBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
