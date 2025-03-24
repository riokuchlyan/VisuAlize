from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router
from contextlib import asynccontextmanager
from fastapi import Request
from globals import Environment

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