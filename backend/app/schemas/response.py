from typing import Optional, Generic, TypeVar, Any
from pydantic import BaseModel

T = TypeVar("T")

class BaseResponse(BaseModel, Generic[T]):
    success: bool
    message: str
    data: Optional[T] = None

class SuccessResponse(BaseResponse[T]):
    success: bool = True
    message: str = "Operation successful"

class ErrorResponse(BaseResponse):
    success: bool = False
    message: str = "Resource not found"
