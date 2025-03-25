from flask import Flask, request, jsonify, render_template, send_from_directory
from datetime import datetime
import sqlite3
import os
import json

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

@app.route('/api', methods=['GET'])
def index():
    return {"message": "Hello from Flask API!"}

@app.route('/api/items', methods=['POST'])
def add_item():
    data = request.get_json()
    name = data.get('item_name')
    price = data.get('item_price')
    image = data.get('item_image')
    created_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    try:
        with sqlite3.connect('pos.db') as conn:
            cursor = conn.cursor()
            cursor.execute("INSERT INTO items (item_name, price, image_path, created_at) VALUES (?, ?, ?, ?)", (name, price, image, created_at))
            conn.commit()

            return {"message": "Item added successfully!"}, 201
    except Exception as e:
        print("Server error:", e)
        return {"message": "Server error"}, 500

# add pagination to this endpoint
@app.route('/api/items', methods=['GET'])
def get_items():
    try:
        with sqlite3.connect('pos.db') as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM items")
            items = cursor.fetchall()

            items_json = [
                {
                    "id": item[0],
                    "item_name": item[1],
                    "price": item[2],
                    "image_path": item[3],
                    "created_at": item[4]
                } for item in items
            ]

            return items_json, 200
    except Exception as e:
        print("Error fetching items:", e)
        return {"message": "Error fetching items"}, 500

@app.route('/api/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    try:
        with sqlite3.connect('pos.db') as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM items WHERE id=?", (item_id,))
            item = cursor.fetchone()

            if item:
                return {
                    "id": item[0],
                    "item_name": item[1],
                    "price": item[2],
                    "image_path": item[3],
                    "created_at": item[4]
                }, 200
            else:
                return {"message": "Item not found"}, 404
    except Exception as e:
        print("Error fetching item:", e)
        return {"message": "Error fetching item"}, 500

@app.route('/api/items/<int:item_id>', methods=['PATCH'])
def update_item(item_id):
    data = request.get_json()
    name = data.get('item_name')
    price = data.get('item_price')
    image = data.get('item_image')

    fields = {key: value for key, value in {
        "item_name": name,
        "price": price,
        "image_path": image
    }.items() if value is not None }
    set_clause = ", ".join(f"{key}=?" for key, _ in fields.items())
    query = f"UPDATE items SET {set_clause} WHERE id=?"

    if fields:
        try:
            with sqlite3.connect('pos.db') as conn:
                cursor = conn.cursor()
                cursor.execute(query, tuple(value for _, value in fields.items()) + (item_id,))
                conn.commit()

                return {"message": "Item updated successfully!"}, 200
        except Exception as e:
            print("Server error:", e)
            return {"message": "Server error"}, 500
    else:
        return {"message": "Nothing to update"}, 200


@app.route('/api/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    try:
        with sqlite3.connect('pos.db') as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM items WHERE id=?", (item_id,))

            # no item found
            if cursor.rowcount == 0:
                return {"message": "Item not found"}, 404

            return "", 204
    except Exception as e:
        print("Error fetching item:", e)
        return {"message": "Error fetching item"}, 500

if __name__ == '__main__':
   app.run(debug=True)