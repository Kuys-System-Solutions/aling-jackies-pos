# server/controller/item_controller.py
from flask import request, jsonify, Blueprint
import logging
from models import item_model
from repository import item_repository

# Configure controller logger
logger = logging.getLogger(__name__)

# Create a Blueprint for the menu item routes
item_bp = Blueprint('item', __name__, url_prefix='/api/items')

# Initialize the repository
item_repo = item_repository.ItemRepository()

@item_bp.route('', methods=['GET'])
def get_all_items():
    """
    Get all menu items with pagination
    
    Query Parameters:
        page (int): Page number (default: 1)
        per_page (int): Items per page (default: 10)
        
    Returns:
        JSON: List of menu items and pagination info
    """
    try:
        # Get pagination parameters
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        # Log the request parameters
        logger.info(f"Getting items with page={page}, per_page={per_page}")
        
        # Validate pagination parameters
        if page < 1:
            page = 1
            logger.warning(f"Invalid page parameter, defaulting to page=1")
        if per_page < 1 or per_page > 100:
            per_page = 10
            logger.warning(f"Invalid per_page parameter, defaulting to per_page=10")
            
        # Get items from repository
        result = item_repo.get_all_items(page, per_page)
        
        if result is None:
            logger.error("Failed to retrieve items from repository")
            return jsonify({"error": "Failed to retrieve items"}), 500
        
        logger.info(f"Retrieved {len(result.get('items', []))} items")
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@item_bp.route('/<int:item_id>', methods=['GET'])
def get_item(item_id):
    """
    Get a menu item by ID
    
    Args:
        item_id (int): The ID of the item to retrieve
        
    Returns:
        JSON: Menu item data or error message
    """
    try:
        item = item_repo.get_item_by_id(item_id)
        
        if item is None:
            return jsonify({"error": "Item not found"}), 404
            
        return jsonify(item), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@item_bp.route('', methods=['POST'])
def add_item():
    """
    Create a new menu item
    
    JSON Body:
        item_name (str): Name of the item
        price (float): Price of the item
        image_path (str, optional): Path to the item's image
        
    Returns:
        JSON: Success message and new item ID, or error message
    """
    try:
        data = request.get_json(force=True)

        print('we are here!')
        
        # Create and validate a new Item
        item = item_model.Item.from_dict(data)
        is_valid, error_msg = item.validate()
        
        if not is_valid:
            return jsonify({"error": error_msg}), 400
            
        # Check if item with the same name already exists
        if item_repo.item_exists(item.item_name):
            return jsonify({"error": "An item with this name already exists"}), 409

        # Create the item in the repository
        new_id = item_repo.create_item({
            "item_name": item.item_name,
            "price": item.price,
            "image_path": item.image_path
        })
        
        if new_id is None:
            return jsonify({"error": "Failed to create item"}), 500
            
        return jsonify({
            "message": "Item added successfully!",
            "id": new_id
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@item_bp.route('/<int:item_id>', methods=['PATCH'])
def update_item(item_id):
    """
    Update an existing menu item
    
    Args:
        item_id (int): The ID of the item to update
        
    JSON Body:
        item_name (str, optional): New name for the item
        price (float, optional): New price for the item
        image_path (str, optional): New image path for the item
        
    Returns:
        JSON: Success or error message
    """
    try:
        data = request.get_json()
        
        # Check if the item exists
        existing_item = item_repo.get_item_by_id(item_id)
        if existing_item is None:
            return jsonify({"error": "Item not found"}), 404
            
        # Create a Item with the updated data
        updated_item = item_model.Item.from_dict({**existing_item, **data})
        
        # Validate the updated item
        is_valid, error_msg = updated_item.validate()
        if not is_valid:
            return jsonify({"error": error_msg}), 400
            
        # Update the item in the repository
        success = item_repo.update_item(item_id, updated_item.to_dict())
        
        if not success:
            return jsonify({"error": "Failed to update item"}), 500
            
        return jsonify({"message": "Item updated successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@item_bp.route('/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    """
    Delete a menu item
    
    Args:
        item_id (int): The ID of the item to delete
        
    Returns:
        JSON: Success or error message
    """
    try:
        # Check if the item exists
        existing_item = item_repo.get_item_by_id(item_id)
        if existing_item is None:
            return jsonify({"error": "Item not found"}), 404
            
        # Delete the item from the repository
        success = item_repo.delete_item(item_id)
        
        if not success:
            return jsonify({"error": "Failed to delete item"}), 500
            
        return "", 204
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@item_bp.route('/search', methods=['GET'])
def search_items():
    """
    Search for menu items by name
    
    Query Parameters:
        q (str): Search term
        
    Returns:
        JSON: List of matching menu items
    """
    try:
        search_term = request.args.get('q', '')
        
        if not search_term:
            return jsonify({"error": "Search term is required"}), 400
            
        items = item_repo.search_items(search_term)
        
        return jsonify({"items": items, "count": len(items)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@item_bp.route('/price-range', methods=['GET'])
def get_by_price_range():
    """
    Get menu items within a price range
    
    Query Parameters:
        min (float): Minimum price
        max (float): Maximum price
        
    Returns:
        JSON: List of matching menu items
    """
    try:
        min_price = request.args.get('min', 0, type=float)
        max_price = request.args.get('max', float('inf'), type=float)
        
        if min_price < 0:
            return jsonify({"error": "Minimum price cannot be negative"}), 400
            
        if max_price < min_price:
            return jsonify({"error": "Maximum price cannot be less than minimum price"}), 400
            
        items = item_repo.get_items_by_price_range(min_price, max_price)
        
        return jsonify({"items": items, "count": len(items)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500