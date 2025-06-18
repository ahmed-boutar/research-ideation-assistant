from flask import Blueprint, request, jsonify
from .services.bedrock_api import call_bedrock
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
