# server/app.py
from flask import Flask, request, jsonify
from datetime import datetime
import sqlite3
import os
import json
import logging
import sys

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

@app.route('/api', methods=['GET'])
def index():
    logger.info('Index endpoint called')
    return {"message": "Hello from Flask API!"}

@app.route('/api/items', methods=['POST'])
def add_item():
    data = request.get_json()
    name = data.get('item_name')
    price = data.get('item_price')
    image = data.get('item_image')
    created_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    logger.info(f"Adding new item: {name} with price {price}")

    try:
        with sqlite3.connect('pos.db') as conn:
            cursor = conn.cursor()
            cursor.execute("INSERT INTO items (item_name, price, image_path, created_at) VALUES (?, ?, ?, ?)", 
                          (name, price, image, created_at))
            conn.commit()
            new_id = cursor.lastrowid
            logger.info(f"Item added successfully with ID: {new_id}")

            return {"message": "Item added successfully!", "id": new_id}, 201
    except Exception as e:
        logger.error(f"Server error adding item: {e}", exc_info=True)
        return {"message": "Server error"}, 500

@app.route('/api/items', methods=['GET'])
def get_items():
    try:
        # Get pagination parameters
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        logger.info(f"Getting items with pagination: page={page}, per_page={per_page}")
        
        # Validate pagination parameters
        if page < 1:
            page = 1
            logger.warning(f"Invalid page parameter, defaulting to page=1")
        if per_page < 1 or per_page > 100:
            per_page = 10
            logger.warning(f"Invalid per_page parameter, defaulting to per_page=10")
        
        # Calculate offset for pagination
        offset = (page - 1) * per_page
        
        with sqlite3.connect('pos.db') as conn:
            cursor = conn.cursor()
            
            # Get total count for pagination metadata
            cursor.execute("SELECT COUNT(*) FROM items")
            total_count = cursor.fetchone()[0]
            
            # Get paginated items
            cursor.execute("SELECT * FROM items LIMIT ? OFFSET ?", (per_page, offset))
            items = cursor.fetchall()
            
            logger.info(f"Retrieved {len(items)} items (total in DB: {total_count})")

            items_json = [
                {
                    "id": item[0],
                    "item_name": item[1],
                    "price": item[2],
                    "image_path": item[3],
                    "created_at": item[4]
                } for item in items
            ]
            
            result = {
                "items": items_json,
                "pagination": {
                    "total": total_count,
                    "page": page,
                    "per_page": per_page,
                    "pages": (total_count + per_page - 1) // per_page  # Ceiling division
                }
            }

            return result, 200
    except Exception as e:
        logger.error(f"Error fetching items: {e}", exc_info=True)
        return {"message": "Error fetching items"}, 500

@app.route('/api/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    logger.info(f"Getting item with ID: {item_id}")
    
    try:
        with sqlite3.connect('pos.db') as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM items WHERE id=?", (item_id,))
            item = cursor.fetchone()

            if item:
                logger.info(f"Item found: {item[1]}")
                return {
                    "id": item[0],
                    "item_name": item[1],
                    "price": item[2],
                    "image_path": item[3],
                    "created_at": item[4]
                }, 200
            else:
                logger.warning(f"Item not found with ID: {item_id}")
                return {"message": "Item not found"}, 404
    except Exception as e:
        logger.error(f"Error fetching item: {e}", exc_info=True)
        return {"message": "Error fetching item"}, 500

@app.route('/api/items/<int:item_id>', methods=['PATCH'])
def update_item(item_id):
    logger.info(f"Updating item with ID: {item_id}")
    
    data = request.get_json()
    name = data.get('item_name')
    price = data.get('item_price')
    image = data.get('item_image')

    # Log the update attempt
    update_fields = []
    if name:
        update_fields.append(f"name='{name}'")
    if price:
        update_fields.append(f"price='{price}'")
    if image:
        update_fields.append(f"image='{image}'")
    
    if update_fields:
        logger.info(f"Update fields: {', '.join(update_fields)}")

    fields = {key: value for key, value in {
        "item_name": name,
        "price": price,
        "image_path": image
    }.items() if value is not None }
    
    if not fields:
        logger.info("No fields to update")
        return {"message": "Nothing to update"}, 200
    
    set_clause = ", ".join(f"{key}=?" for key, _ in fields.items())
    query = f"UPDATE items SET {set_clause} WHERE id=?"

    try:
        with sqlite3.connect('pos.db') as conn:
            cursor = conn.cursor()
            cursor.execute(query, tuple(value for _, value in fields.items()) + (item_id,))
            conn.commit()
            
            if cursor.rowcount > 0:
                logger.info(f"Item updated successfully: {item_id}")
                return {"message": "Item updated successfully!"}, 200
            else:
                logger.warning(f"Item not found for update: {item_id}")
                return {"message": "Item not found"}, 404
    except Exception as e:
        logger.error(f"Server error updating item: {e}", exc_info=True)
        return {"message": "Server error"}, 500

@app.route('/api/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    logger.info(f"Deleting item with ID: {item_id}")
    
    try:
        with sqlite3.connect('pos.db') as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM items WHERE id=?", (item_id,))

            # no item found
            if cursor.rowcount == 0:
                logger.warning(f"Item not found for deletion: {item_id}")
                return {"message": "Item not found"}, 404

            logger.info(f"Item deleted successfully: {item_id}")
            return "", 204
    except Exception as e:
        logger.error(f"Error deleting item: {e}", exc_info=True)
        return {"message": "Error deleting item"}, 500

@app.route('/api/items/search', methods=['GET'])
def search_items():
    search_term = request.args.get('q', '')
    logger.info(f"Searching for items with term: '{search_term}'")
    
    if not search_term:
        logger.warning("Empty search term provided")
        return {"message": "Search term is required"}, 400
    
    try:
        with sqlite3.connect('pos.db') as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM items WHERE item_name LIKE ?", (f"%{search_term}%",))
            items = cursor.fetchall()
            
            logger.info(f"Found {len(items)} items matching search term")
            
            items_json = [
                {
                    "id": item[0],
                    "item_name": item[1],
                    "price": item[2],
                    "image_path": item[3],
                    "created_at": item[4]
                } for item in items
            ]
            
            return {"items": items_json, "count": len(items_json)}, 200
    except Exception as e:
        logger.error(f"Error searching items: {e}", exc_info=True)
        return {"message": "Error searching items"}, 500

if __name__ == '__main__':
    logger.info("Starting Flask server...")
    app.run(debug=True)