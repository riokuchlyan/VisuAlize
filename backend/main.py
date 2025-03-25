import os
from fastapi import FastAPI # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
from api.routes import router
from contextlib import asynccontextmanager
from fastapi import Request # type: ignore
from globals import Environment
import uvicorn # type: ignore

def setup_environment(app: FastAPI):
    enviornment = Environment()
    app.state.environment = enviornment 

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Starting up")
    setup_environment(app)
    yield
    print("Shutting down")

app = FastAPI(lifespan=lifespan)

app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root(req: Request):
    environment: Environment = req.app.state.environment
    return {"message": "Welcome to the VisuAlize backend"}

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000)) 
    uvicorn.run(app, host="0.0.0.0", port=port)