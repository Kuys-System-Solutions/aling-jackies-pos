# server/db.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Item(db.Model):
    __tablename__ = 'items'
    id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String(120), nullable=False)
    price = db.Column(db.Float, nullable=False)
    image_path = db.Column(db.String(255))
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.current_timestamp())

class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    daily_customer_number = db.Column(db.Integer)
    monthly_customer_number = db.Column(db.Integer)
    items = db.Column(db.Text)
    total_amount = db.Column(db.Float)
    discounted_total = db.Column(db.Float)
    order_date = db.Column(db.DateTime, server_default=db.func.current_timestamp())
    status = db.Column(db.String(50), default='pending')
    synced = db.Column(db.Boolean, default=False)
    table_num = db.Column(db.Integer, default=1)
    order_type = db.Column(db.Boolean, default=True)