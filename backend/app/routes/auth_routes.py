from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from datetime import timedelta

from ..database import get_db
from ..models.user import User
from ..schemas import user as user_schemas
from ..dependencies import auth as auth_dep
from ..config import settings

# Initialize SlowAPI limiter instance (main app will attach it)
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/register", response_model=user_schemas.UserOut, status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
def register(request: Request, user_in: user_schemas.UserCreate, db: Session = Depends(get_db)):
    # 1. Check if email already exists
    existing_user = db.query(User).filter(User.email == user_in.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email is already registered"
        )
    
    # 2. Hash password and save new user
    hashed_pw = auth_dep.get_password_hash(user_in.password)
    db_user = User(
        email=user_in.email,
        hashed_password=hashed_pw,
        full_name=user_in.full_name
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.post("/login", response_model=user_schemas.Token)
@limiter.limit("5/minute")
def login(request: Request, credentials: user_schemas.UserLogin, db: Session = Depends(get_db)):
    # 1. Fetch user by email
    db_user = db.query(User).filter(User.email == credentials.email).first()
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid email or password"
        )
    
    # 2. Verify password hash
    if not auth_dep.verify_password(credentials.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid email or password"
        )
    
    # 3. Create access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    token_data = {"sub": db_user.email}
    token = auth_dep.create_access_token(data=token_data, expires_delta=access_token_expires)
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": db_user
    }

@router.post("/oauth", response_model=user_schemas.Token)
def oauth_login(request: Request, oauth_in: user_schemas.OAuthLogin, db: Session = Depends(get_db)):
    # 1. Fetch user by email
    db_user = db.query(User).filter(User.email == oauth_in.email).first()
    
    if not db_user:
        # If user does not exist, create a new user with dummy hashed password
        dummy_pw = auth_dep.get_password_hash(f"oauth_dummy_pw_{oauth_in.provider}_{settings.JWT_SECRET[:10]}")
        db_user = User(
            email=oauth_in.email,
            hashed_password=dummy_pw,
            full_name=oauth_in.full_name
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        
    # 2. Create access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    token_data = {"sub": db_user.email}
    token = auth_dep.create_access_token(data=token_data, expires_delta=access_token_expires)
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": db_user
    }

