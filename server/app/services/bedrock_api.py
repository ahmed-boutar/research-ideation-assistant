import requests
import json
from flask import current_app

def call_bedrock(description):
    """
    Calls your deployed Lambda through API Gateway.
    """

    api_gateway_url = current_app.config['API_GATEWAY_URL']

    payload = {
        'prompt': description  # matching your Lambda expected input
    }

    headers = {
        'Content-Type': 'application/json'
    }

    response = requests.post(api_gateway_url, data=json.dumps(payload), headers=headers)

    if response.status_code != 200:
        raise Exception(f'API Gateway error: {response.status_code}, {response.text}')

    response_json = response.json()

    # ✅ Match your Lambda response exactly
    generated_text = response_json.get('generated_text', '')

    return generated_text


def call_bedrock_with_chat_history(chat_history, user_id):
    """
    Calls your deployed Lambda through API Gateway with chat history.
    """
    api_gateway_url = current_app.config['API_GATEWAY_URL']

    payload = {
        'chat_history': chat_history,  # The frontend already formats this properly
        'user_id': user_id  # Optional, if your Lambda expects a user ID
    }

    headers = {
        'Content-Type': 'application/json'
    }

    response = requests.post(api_gateway_url, data=json.dumps(payload), headers=headers)

    if response.status_code != 200:
        raise Exception(f'API Gateway error: {response.status_code}, {response.text}')

    response_json = response.json()

    generated_text = response_json.get('generated_text', '')
    return generated_text

