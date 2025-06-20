from flask import Blueprint, request, jsonify
from .services.bedrock_api import call_bedrock, call_bedrock_with_chat_history
from .utils.error_handler import handle_exception

main = Blueprint('main', __name__)

@main.route('/generate-ideation', methods=['POST'])
def generate_ideation():
    try:
        data = request.get_json()
        description = data.get('description', '')

        if not description:
            return jsonify({'error': 'Description is required'}), 400

        result = call_bedrock(description)
        return jsonify({'ideation': result})

    except Exception as e:
        return handle_exception(e)
    
@main.route('/generate', methods=['POST'])
def generate_chat():
    try:
        data = request.get_json()
        chat_history = data.get('chat_history', [])
        user_id = data.get('user_id', '')

        if not chat_history:
            return jsonify({'error': 'Chat history is required'}), 400

        result = call_bedrock_with_chat_history(chat_history, user_id)
        return jsonify({'generated_text': result})

    except Exception as e:
        return handle_exception(e)

