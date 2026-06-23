from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
import traceback

async def exception_handler(request: Request, exc: Exception):
    if isinstance(exc, HTTPException):
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "success": False,
                "message": exc.detail
            }
        )

    # Log the full traceback for debugging
    print(traceback.format_exc())

    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "message": "Internal Server Error"
        }
    )

