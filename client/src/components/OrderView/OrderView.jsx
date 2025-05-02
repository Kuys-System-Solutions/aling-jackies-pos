import React, { useState } from 'react';
import './OrderView.css';

/**
 * OrderView Component
 * Displays the current orders to be made to the kitchen or studio
 * 
 * @param {Object} props
 * @param {string} props.title - Title of the order view
 * @param {Array} props.orders - List of orders to be displayed
 */
const OrderView = ({ title = "Current Orders", orders = [] }) => {
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Toggle order expansion
  const toggleOrderExpansion = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  // Mark order as complete
  const markAsComplete = (orderId) => {
    console.log(`Order ${orderId} marked as complete`);
  };

  // Calculate time difference in minutes
  const getTimeDifference = (orderTime) => {
    const now = new Date();
    const orderDate = new Date(orderTime);
    const diffMs = now - orderDate;
    const diffMins = Math.floor(diffMs / 60000);
    return diffMins;
  };

  return (
    <div className="order-view-container">
      <div className="order-view-header">
        <h2>{title}</h2>
        <div className="order-count">{orders.length} Orders</div>
      </div>

      <div className="orders-grid">
        {orders.length === 0 ? (
          <div className="no-orders">No orders available</div>
        ) : (
          orders.map((order) => (
            <div 
              key={order.id} 
              className={`order-card ${expandedOrder === order.id ? 'expanded' : ''}`}
              onClick={() => toggleOrderExpansion(order.id)}
            >
              <div className="order-header">
                <div className="order-id">Order #{order.id}</div>
                <div className="order-time">
                  {getTimeDifference(order.orderTime)} min ago
                </div>
              </div>
              
              <div className="order-type">
                {order.orderType === 'dine-in' ? 'Dine-in' : 'Take-out'}
                {order.orderType === 'dine-in' && (
                  <span className="table-number"> • Table {order.tableNumber}</span>
                )}
              </div>
              
              <div className="order-items">
                {order.items.slice(0, expandedOrder === order.id ? order.items.length : 3).map((item, idx) => (
                  <div key={idx} className="order-item">
                    <span className="item-quantity">{item.quantity}x</span>
                    <span className="item-name">{item.name}</span>
                  </div>
                ))}
                
                {!expandedOrder === order.id && order.items.length > 3 && (
                  <div className="more-items">+{order.items.length - 3} more items</div>
                )}
              </div>
              
              {expandedOrder === order.id && (
                <div className="order-actions">
                  <button 
                    className="complete-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      markAsComplete(order.id);
                    }}
                  >
                    Mark as Complete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Add these export statements at the end of the file
export { OrderView };
export default OrderView;