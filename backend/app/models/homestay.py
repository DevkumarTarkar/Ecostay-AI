from sqlalchemy import Column, Integer, String, Float, DateTime, Text, JSON
from sqlalchemy.sql import func
from ..database import Base

class Homestay(Base):
    __tablename__ = "homestays"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    price_per_night = Column(Float, nullable=False)
    description = Column(Text, nullable=True)
    rating = Column(Float, default=0.0)
    reviews_count = Column(Integer, default=0)
    guests = Column(Integer, default=1)
    bedrooms = Column(Integer, default=1)
    bathrooms = Column(Integer, default=1)
    sustainability_level = Column(String(50), default="Level 1")
    amenities = Column(JSON, default=[])
    photos = Column(JSON, default=[])
    featured_photo = Column(String(500), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
