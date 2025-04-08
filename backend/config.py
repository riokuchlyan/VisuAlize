# internal

# external
from dotenv import load_dotenv

# built-in
import os

load_dotenv()

OPEN_AI_KEY = os.getenv("OPEN_AI_KEY")
NEWS_API_KEY = os.getenv("NEWS_API_KEY")