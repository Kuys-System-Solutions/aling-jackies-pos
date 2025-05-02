# server/app.py
from flask import Flask, request, jsonify
from datetime import datetime
import sqlite3
import os
import json
import logging
import sys
from controller.item_controller import item_bp

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


app = Flask(__name__)
app.register_blueprint(item_bp)

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