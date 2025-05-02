import React, { useState, useEffect } from 'react';
import './KitchenView.css';
import KitchenHeader from '../../components/KitchenHeader/KitchenHeader';

const KitchenView = () => {
  // Sample order data
  const [orders, setOrders] = useState([
    {
      id: '01293',
      orderTime: '11:48:00',
      customerName: 'Edwin',
      orderType: 'Dine-In',
      items: [
        { quantity: 2, name: 'Beef Pares w/ Garlic Rice' },
        { quantity: 1, name: 'Grilled Liempo' },
        { quantity: 1, name: 'Chicken Burger' },
        { quantity: 1, name: 'Salted Egg' },
        { quantity: 3, name: 'Chao Fan Cordon' },
        { quantity: 1, name: 'Chao Fan Chicken' },
        { quantity: 2, name: 'Chao Fan Shanghai' },
        { quantity: 1, name: 'Siomai' },
        { quantity: 3, name: 'Tofu BBQ' },
        { quantity: 9, name: 'Dalgona coffee' }
      ]
    },
    {
      id: '01284',
      orderTime: '11:58:31',
      customerName: 'Marvin',
      orderType: 'Dine-In',
      items: [
        { quantity: 2, name: 'Double Quarter Burger' },
        { quantity: 1, name: 'Grilled Liempo' },
        { quantity: 1, name: 'Solo Puto Cheese' },
        { quantity: 1, name: 'Nachos Overload' },
        { quantity: 3, name: 'Ham and Cheese Roll On Stick' },
        { quantity: 1, name: 'Dalgona Salted Caramel' }
      ]
    },
    {
      id: '02344',
      orderTime: '11:43:20',
      customerName: 'Malou',
      orderType: 'Take-out',
      items: [
        { 
          quantity: 1, 
          name: 'Bundle Combo Packed',
          details: [
            'Party Tray 10 Spaghetti',
            'Party Tray 20 Slices Chicken Cordon Bleu w/Tartar Sauce',
            'Party Tray 80 pcs - Half Size Cheesy Pork Shanghai w/ sweet and sour chili sauce',
            '6 Inches puto cake w/salted egg',
            'Chocolate banana loaf w/ triple nuts (1000mL)',
            'Basque Burnt Cheesecake (6\' in can)'
          ]
        }
      ]
    },
    {
      id: '02465',
      orderTime: '11:52:19',
      customerName: 'Jessie',
      orderType: 'Take-out',
      items: [
        { quantity: 1, name: 'Chicken Premium Party Tray' },
        { quantity: 1, name: 'Seafood Premium Party Tray' },
        { quantity: 1, name: 'Pork Premium Party Tray' }
      ]
    },
    {
      id: '01293',
      orderTime: '11:48:00',
      customerName: 'Cecil',
      orderType: 'Dine-In',
      items: [
        { quantity: 2, name: 'Chao Fan Cordon' },
        { quantity: 1, name: 'Grilled Liempo' }
      ]
    },
    {
      id: '02465',
      orderTime: '11:52:19',
      customerName: 'Raul',
      orderType: 'Take-out',
      items: [
        { 
          quantity: 1, 
          name: 'Bundle Party Box Noypi',
          details: [
            'Pancit Malabon (6pax)',
            'Cheesy Pork Shanghai w/ sweet and sour chili sauce',
            'Puto Cheese cupcakes (9pcs)',
            'Pork Barbeque w/ pang malakasan suka (10pcs)'
          ]
        },
        { quantity: 1, name: 'Chicken Premium Party Tray' }
      ]
    },
    {
      id: '01293',
      orderTime: '11:48:00',
      customerName: 'Charmaine',
      orderType: 'Dine-In',
      items: [
        { quantity: 2, name: 'Chao Fan Shanghai' },
        { quantity: 1, name: 'Siomai' },
        { quantity: 3, name: 'Tofu BBQ' },
        { quantity: 9, name: 'Dalgona coffee' }
      ]
    }
  ]);

  return (
    <div className="kitchen-view-wrapper">
      <KitchenHeader />
      
      <div className="main-content">
        <div className="orders-container">
          {orders.map((order, index) => (
            <div key={index} className={`order-card ${order.orderType === 'Take-out' ? 'takeout' : 'dinein'}`}>
              <div className="order-header">
                <div className="order-info">
                  <div className="order-id">#{order.id}</div>
                  <div className="order-time">{order.orderTime}</div>
                </div>
                <div className="customer-info">
                  <div className="customer-name">{order.customerName}</div>
                  <div className="order-type">{order.orderType}</div>
                </div>
              </div>
              
              <div className="order-items">
                {order.items.map((item, idx) => (
                  <div key={idx} className="item">
                    <div className="item-quantity">{item.quantity} x</div>
                    <div className="item-name">
                      {item.name}
                      
                      {item.details && (
                        <ul className="item-details">
                          {item.details.map((detail, detailIdx) => (
                            <li key={detailIdx}>• {detail}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KitchenView;