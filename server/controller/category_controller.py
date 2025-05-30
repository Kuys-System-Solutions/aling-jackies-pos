# server/controller/category_controller.py
from flask import request, jsonify, Blueprint
import logging
from models import category_model
from repository import category_repository

logger = logging.getLogger(__name__)

category_bp = Blueprint('category', __name__, url_prefix='/api/categories')

category_repo = category_repository.CategoryRepository()

@category_bp.route('', methods=['GET'])
def get_all_categories():
    """
    Get all categories with pagination
    Query Parameters:
        page (int): Page number (default: 1)
        per_page (int): Categories per page (default: 10)
    Returns:
        JSON: List of categories and pagination info
    """
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        logger.info(f"Getting categories with page={page}, per_page={per_page}")
        if page < 1:
            page = 1
            logger.warning(f"Invalid page parameter, defaulting to page=1")
        if per_page < 1 or per_page > 100:
            per_page = 10
            logger.warning(f"Invalid per_page parameter, defaulting to per_page=10")
        result = category_repo.get_all_categories(page, per_page)
        if result is None:
            logger.error("Failed to retrieve categories from repository")
            return jsonify({"error": "Failed to retrieve categories"}), 500
        logger.info(f"Retrieved {len(result.get('categories', []))} categories")
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@category_bp.route('/<int:category_id>', methods=['GET'])
def get_category(category_id):
    """
    Get a category by ID
    Args:
        category_id (int): The ID of the category to retrieve
    Returns:
        JSON: Category data or error message
    """
    try:
        category = category_repo.get_category_by_id(category_id)
        if category is None:
            return jsonify({"error": "Category not found"}), 404
        return jsonify(category), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@category_bp.route('', methods=['POST'])
def add_category():
    """
    Create a new category
    JSON Body:
        category_name (str): Name of the category
        parent_category_id (int, optional): Parent category ID
    Returns:
        JSON: Success message and new category ID, or error message
    """
    try:
        data = request.get_json(force=True)
        category = category_model.Category.from_dict(data)
        is_valid, error_msg = category.validate()
        if not is_valid:
            return jsonify({"error": error_msg}), 400
        if category_repo.category_exists(category.category_name):
            return jsonify({"error": "A category with this name already exists"}), 409
        new_id = category_repo.create_category({
            "category_name": category.category_name,
            "parent_category_id": category.parent_category_id
        })
        if new_id is None:
            return jsonify({"error": "Failed to create category"}), 500
        return jsonify({
            "message": "Category added successfully!",
            "id": new_id
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@category_bp.route('/<int:category_id>', methods=['PATCH'])
def update_category(category_id):
    """
    Update an existing category
    Args:
        category_id (int): The ID of the category to update
    JSON Body:
        category_name (str, optional): New name for the category
        parent_category_id (int, optional): New parent category ID
    Returns:
        JSON: Success or error message
    """
    try:
        data = request.get_json()
        existing_category = category_repo.get_category_by_id(category_id)
        if existing_category is None:
            return jsonify({"error": "Category not found"}), 404
        updated_category = category_model.Category.from_dict({**existing_category, **data})
        is_valid, error_msg = updated_category.validate()
        if not is_valid:
            return jsonify({"error": error_msg}), 400
        success = category_repo.update_category(category_id, updated_category.to_dict())
        if not success:
            return jsonify({"error": "Failed to update category"}), 500
        return jsonify({"message": "Category updated successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@category_bp.route('/<int:category_id>', methods=['DELETE'])
def delete_category(category_id):
    """
    Delete a category
    Args:
        category_id (int): The ID of the category to delete
    Returns:
        JSON: Success or error message
    """
    try:
        existing_category = category_repo.get_category_by_id(category_id)
        if existing_category is None:
            return jsonify({"error": "Category not found"}), 404
        success = category_repo.delete_category(category_id)
        if not success:
            return jsonify({"error": "Failed to delete category"}), 500
        return "", 204
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@category_bp.route('/search', methods=['GET'])
def search_categories():
    """
    Search for categories by name
    Query Parameters:
        q (str): Search term
    Returns:
        JSON: List of matching categories
    """
    try:
        search_term = request.args.get('q', '')
        if not search_term:
            return jsonify({"error": "Search term is required"}), 400
        categories = category_repo.search_categories(search_term)
        return jsonify({"categories": categories, "count": len(categories)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@category_bp.route('/<int:parent_category_id>/subcategories', methods=['GET'])
def get_subcategories(parent_category_id):
    """
    Get all subcategories for a given parent category ID
    Args:
        parent_category_id (int): The parent category ID
    Returns:
        JSON: List of subcategory dictionaries
    """
    try:
        subcategories = category_repo.get_subcategories(parent_category_id)
        return jsonify({"subcategories": subcategories, "count": len(subcategories)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
