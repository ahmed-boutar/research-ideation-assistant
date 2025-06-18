import os
from dotenv import load_dotenv

# Load env vars from .env file
load_dotenv()

class Config:
    API_GATEWAY_URL = os.getenv('API_GATEWAY_URL')  # your Bedrock Lambda API Gateway endpoint
