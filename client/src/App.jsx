import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router';
import OrderView from './pages/OrderView';
import PendingOrders from './pages/PendingOrders';
import OrderHistory from './pages/OrderHistory';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/order-now" element={<OrderView />} />
      <Route path="/current-orders/:id" element={<PendingOrders />} />
      <Route path="/order-history" element={<OrderHistory />} />
    </Routes>
  );
}

function Index() {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <>
      <h1>Welcome to Aling Jackie's POS and Inventory System!</h1>
      <p>Hello from React...</p>
      {typeof data === 'undefined' ? (
        <p>Loading...</p>
      ) : (
        <p>...and {data.message}</p>
      )}

      <p>This is where we add the Dine In/Take Out options.</p>
      <p>
        Try going to the <a href="/order-now">POS</a> page.
      </p>
    </>
  );
}

export default App;
