from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import router as api_router

from app.core.middleware import LoggingMiddleware

app = FastAPI(
    title="Anurag's Portfolio API",
    description="Backend for Personal Portfolio Service",
    version="1.0.0"
)

# Add Middleware
app.add_middleware(LoggingMiddleware)

# CORS Configuration
# Allow requests from the frontend (will be running on localhost:5173 usually for Vite)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000", # Fallback
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(api_router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "Portfolio API is running. Visit /docs for Swagger UI."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
