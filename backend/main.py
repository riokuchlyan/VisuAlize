# internal

# external
from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware 
from api.routes import router
import uvicorn 

# built-in
import os

app: FastAPI = FastAPI()

app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://visualize-navy.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to the VisuAlize backend"}

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000)) 
    uvicorn.run(app, host="0.0.0.0", port=port)