import time
import logging
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

# Setup Request Logger
import os
import sys

# Ensure logs directory exists
os.makedirs("logs", exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler("logs/app.log"),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger("api_logger")

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        
        # Log Request
        logger.info(f"➡️ [REQ] {request.method} {request.url.path}")
        
        try:
            response = await call_next(request)
            process_time = time.time() - start_time
            
            # Log Response
            logger.info(
                f"⬅️ [RES] {response.status_code} | {request.method} {request.url.path} | {process_time:.3f}s"
            )
            return response
        except Exception as e:
            process_time = time.time() - start_time
            logger.error(
                f"❌ [ERR] {request.method} {request.url.path} | {process_time:.3f}s | Error: {str(e)}"
            )
            raise e
