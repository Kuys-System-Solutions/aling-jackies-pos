import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router';
import OrderView from './components/pages/OrderView';
import PendingOrders from './components/pages/PendingOrders';
import OrderHistory from './components/pages/OrderHistory';
import CRUD from './components/pages/CRUD';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/pos" element={<HomePOS />} />
      <Route path="/pos/order-now" element={<OrderView />} />
      <Route path="/pos/current-orders/:id" element={<PendingOrders />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/order-history" element={<OrderHistory />} />
      <Route path="/admin/crud" element={<CRUD />} />
      <Route path="/admin/inventory" element={<Inventory />} />
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

      <p>You seem a little lost...</p>
      <p>
        Try going to the <a href="secret">POS</a> or <a href="secret">Admin</a>{' '}
        page.
      </p>
    </>
  );
}

// placeholders
function Admin() {
  return <div>Admin Page</div>;
}
function HomePOS() {
  return <div>Admin Page</div>;
}
function Inventory() {
  return <div>Admin Page</div>;
}

export default App;
