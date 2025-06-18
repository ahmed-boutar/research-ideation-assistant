from flask import jsonify

def handle_exception(e):
    print(f"Error occurred: {str(e)}")
    return jsonify({'error': str(e)}), 500
