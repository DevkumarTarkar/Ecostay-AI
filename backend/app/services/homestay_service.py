from sqlalchemy.orm import Session
from ..models.homestay import Homestay
from ..schemas.homestay import HomestayCreate, HomestayUpdate

class HomestayService:
    @staticmethod
    def get_all(db: Session, location: str = None):
        query = db.query(Homestay)
        if location:
            query = query.filter(Homestay.location.ilike(f"%{location}%"))
        return query.all()

    @staticmethod
    def get_by_id(db: Session, homestay_id: int):
        return db.query(Homestay).filter(Homestay.id == homestay_id).first()

    @staticmethod
    def create(db: Session, homestay_data: HomestayCreate):
        db_homestay = Homestay(**homestay_data.model_dump())
        db.add(db_homestay)
        db.commit()
        db.refresh(db_homestay)
        return db_homestay

    @staticmethod
    def update(db: Session, homestay_id: int, homestay_data: HomestayUpdate):
        db_homestay = HomestayService.get_by_id(db, homestay_id)
        if not db_homestay:
            return None
        
        update_data = homestay_data.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_homestay, key, value)
        
        db.commit()
        db.refresh(db_homestay)
        return db_homestay

    @staticmethod
    def delete(db: Session, homestay_id: int):
        db_homestay = HomestayService.get_by_id(db, homestay_id)
        if not db_homestay:
            return False
        
        db.delete(db_homestay)
        db.commit()
        return True
