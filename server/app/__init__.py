from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)

    # Load config
    from . import config
    app.config.from_object(config.Config)

    CORS(app)

    # Register routes
    from .routes import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app
