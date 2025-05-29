import React from 'react';

const OrderList = ({ orderItems, setOrderItems }) => {
  // Calculate totals
  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = subtotal > 0 ? 69.00 : 0; // Example discount logic
  const grandTotal = Math.max(0, subtotal - discount);

  function onRemoveItem(item) {
    setOrderItems(currentItems => currentItems.filter(i => i.id !== item));
  }

  function onUpdateQuantity(item, quantity) {
    setOrderItems(currentItems =>
      currentItems.map(i => 
        i.id === item ? { ...i, quantity: Math.max(1, quantity) } : i
      )
    );
  }

  function onUpdateSpecialInstructions(item, instructions) {
    setOrderItems(currentItems =>
      currentItems.map(i =>
        i.id === item ? { ...i, specialInstructions: instructions } : i
      )
    );
  }

  function onClearOrder() {
    setOrderItems([]);
  }

  function onOrder() {
    // handle order submission
    // this part will interface with the backend to submit the order
    
    // preview of order
    console.log('Order submitted:', orderItems);

    // then clear
    onClearOrder();
  }

  return (
    <div style={{
      width: '30%', // Take 30% of screen width
      height: 'calc(100vh - 84px)', // Account for top padding
      backgroundColor: '#eaeaec',
      borderLeft: '1px solid #eaeaea',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      right: 0,
      top: '84px', // Added top padding of 86px
      zIndex: 10
    }}>
      {/* Order Items Section - Scrollable */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '10px'
      }}>
        {orderItems.map(item => (
          <div 
            key={item.id} 
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              marginBottom: '10px',
              padding: '12px',
              opacity: item.id.toString().includes('placeholder') ? 0.7 : 1
            }}
          >
            {/* Item Header - With image restored */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex' }}>
                <img 
                  src={item.image || 'https://phohoangminh.com/img/placeholders/burger_placeholder.png?v=1'} 
                  alt={item.name} 
                  style={{ 
                    width: '60px', 
                    height: '60px', 
                    objectFit: 'cover', 
                    borderRadius: '4px',
                    marginRight: '10px'
                  }} 
                />
                <div>
                  <div style={{ 
                    color: '#000', 
                    fontWeight: 'bold', 
                    fontSize: '16px',
                    marginBottom: '3px'
                  }}>
                    {item.name}
                  </div>
                  <div style={{ 
                    color: '#4CAF50', 
                    fontSize: '14px'
                  }}>
                    {item.quantity > 1 ? `₱${(item.price * item.quantity).toLocaleString()} (₱${item.price.toLocaleString()} each)` : `₱${item.price.toLocaleString()}`}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => {
                  if (!item.id.toString().includes('placeholder') && onRemoveItem) {
                    onRemoveItem(item.id);
                  }
                }}
                style={{
                  background: '#f77',
                  border: 'none',
                  color: '#fff',
                  cursor: item.id.toString().includes('placeholder') ? 'default' : 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  padding: '0',
                  borderRadius: '50%',
                  width: '22px',
                  height: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '8px'
                }}
              >
                ×
              </button>
            </div>

            {/* Quantity Control - Smaller layout */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              alignItems: 'center',
              marginTop: '10px'
            }}>
              <div style={{
                display: 'flex',
                border: '1px solid #ddd',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <button 
                  onClick={() => {
                    if (!item.id.toString().includes('placeholder') && onUpdateQuantity) {
                      onUpdateQuantity(item.id, Math.max(1, item.quantity - 1));
                    }
                  }}
                  style={{
                    backgroundColor: '#ddd',
                    border: 'none',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: item.id.toString().includes('placeholder') ? 'default' : 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    padding: '0'
                  }}
                >
                  −
                </button>
                <div style={{
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                  fontSize: '14px'
                }}>
                  {item.quantity}
                </div>
                <button 
                  onClick={() => {
                    if (!item.id.toString().includes('placeholder') && onUpdateQuantity) {
                      onUpdateQuantity(item.id, item.quantity + 1);
                    }
                  }}
                  style={{
                    backgroundColor: '#ddd',
                    border: 'none',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: item.id.toString().includes('placeholder') ? 'default' : 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    padding: '0'
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Special Instructions - Exactly as shown in the image with smaller text */}
            <div style={{ marginTop: '10px' }}>
              <div style={{
                position: 'relative',
                width: '100%',
                borderBottom: '1px solid #aaa',
                padding: '6px 0'
              }}>
                {/* Pencil icon */}
                <span style={{ 
                  position: 'absolute',
                  left: '0',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#888'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V15" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 15H12L20.5 6.5C20.8978 6.10217 21.1213 5.56261 21.1213 5C21.1213 4.43739 20.8978 3.89782 20.5 3.5C20.1022 3.10217 19.5626 2.87868 19 2.87868C18.4374 2.87868 17.8978 3.10217 17.5 3.5L9 12V15Z" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 5L19 8" stroke="#888888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                
                {/* Special instructions text (placeholder) */}
                <input 
                  type="text"
                  placeholder="Special instructions (no onions, garlic, etc.)"
                  value={item.specialInstructions || ''}
                  onChange={(e) => {
                    onUpdateSpecialInstructions(item.id, e.target.value);
                  }}
                  style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    fontSize: '14px',
                    backgroundColor: 'transparent',
                    color: '#888',
                    paddingLeft: '24px'
                  }}
                />
              </div>
            </div>
          </div>
        ))}

        {orderItems.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '30px 0', 
            color: '#999'
          }}>
            No items in order.
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div style={{
        padding: '12px',
        borderTop: '1px solid #eaeaea',
        backgroundColor: '#fff'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '6px'
        }}>
          <span style={{ fontSize: '14px' }}>Subtotal:</span>
          <span style={{ fontWeight: 'bold', fontSize: '14px' }}>
            {orderItems.length > 0 ? `P${subtotal.toFixed(2)}` : 'P0.00'}
          </span>
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '6px'
        }}>
          <span style={{ fontSize: '14px' }}>Discount:</span>
          <span style={{ fontWeight: 'bold', fontSize: '14px' }}>
            {orderItems.length > 0 ? `P${discount.toFixed(2)}` : 'P0.00'}
          </span>
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '10px',
          marginTop: '6px',
          paddingTop: '6px',
          borderTop: '1px solid #eaeaea'
        }}>
          <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Grand Total:</span>
          <span style={{ fontWeight: 'bold', fontSize: '16px' }}>
            {orderItems.length > 0 ? `P${grandTotal.toFixed(2)}` : 'P0.00'}
          </span>
        </div>

        {/* Action Buttons - Smaller size */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '10px',
          marginTop: '10px'
        }}>
          <button 
            onClick={onClearOrder}
            style={{
              backgroundColor: '#e8a87c', // Orange cancel button
              border: 'none',
              borderRadius: '8px', // Rounded corners
              color: '#000', // Black text
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'normal',
              padding: '10px 0',
              textAlign: 'center',
              height: '40px'
            }}
          >
            Cancel
          </button>
          <button 
            onClick={onOrder}
            style={{
              backgroundColor: '#9de0ad', // Green order button
              border: 'none',
              borderRadius: '8px', // Rounded corners
              color: '#000', // Black text
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'normal',
              padding: '10px 0',
              textAlign: 'center',
              height: '40px',
              opacity: orderItems.length > 0 ? 1 : 0.7
            }}
            disabled={orderItems.length === 0}
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderList;