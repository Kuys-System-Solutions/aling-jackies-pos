# server/app.py
from flask import Flask, request, jsonify
from datetime import datetime
import sqlite3
import os
import json
import logging
import sys
from .controller.item_controller import menu_item_bp

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Check if repository directory exists
repo_path = os.path.join(os.path.dirname(__file__), 'repository')
if not os.path.exists(repo_path):
    os.makedirs(repo_path)
    with open(os.path.join(repo_path, '__init__.py'), 'w') as f:
        pass  # Create empty __init__.py file

# Check if models directory exists
models_path = os.path.join(os.path.dirname(__file__), 'models')
if not os.path.exists(models_path):
    os.makedirs(models_path)
    with open(os.path.join(models_path, '__init__.py'), 'w') as f:
        pass  # Create empty __init__.py file

# Check if controller directory exists
controller_path = os.path.join(os.path.dirname(__file__), 'controller')
if not os.path.exists(controller_path):
    os.makedirs(controller_path)
    with open(os.path.join(controller_path, '__init__.py'), 'w') as f:
        pass  # Create empty __init__.py file

# Create repository file if it doesn't exist
repo_file = os.path.join(repo_path, 'menu_item_repository.py')
if not os.path.exists(repo_file):
    # This is a placeholder - the actual file should be created separately
    logger.info(f"Repository file does not exist: {repo_file}")

app = Flask(__name__)
app.register_blueprint(menu_item_bp)

"""
Each function here is an API endpoint.
Ideally, these endpoints should be RESTful.

For example, the endpoint for creating an order should be a POST request to /api/orders.
The endpoint for getting all orders should be a GET request to /api/orders.
The endpoint for getting a specific order should be a GET request to /api/orders/<order_id>.

The endpoint for getting all items should be a GET request to /api/items.
The endpoint for getting a specific item should be a GET request to /api/items/<item_id>.
The endpoint for creating an item should be a POST request to /api/items.
The endpoint for updating an item should be a PATCH request to /api/items/<item_id>.
The endpoint for deleting an item should be a DELETE request to /api/items/<item_id>.

And so on.
"""

# Add request logger middleware
@app.before_request
def log_request_info():
    logger.info(f'Request: {request.method} {request.path} - {dict(request.args)}')
    if request.is_json:
        try:
            json_data = request.get_json()
            logger.info(f'Request JSON: {json_data}')
        except Exception as e:
            logger.warning(f'Failed to parse JSON request: {e}')

# Add response logger middleware
@app.after_request
def log_response_info(response):
    logger.info(f'Response: {response.status_code}')
    return response

if __name__ == '__main__':
    logger.info("Starting Flask server...")
    app.run(debug=True)