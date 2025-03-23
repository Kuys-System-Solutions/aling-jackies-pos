from flask import Flask, request, jsonify, render_template, send_from_directory
from datetime import datetime
import sqlite3
import os
import json

app = Flask(__name__)

@app.route('/api', methods=['GET'])
def index():
    print("Called!")
    return {"message": "Hello from Flask!"}

if __name__ == '__main__':
   app.run(debug=True)