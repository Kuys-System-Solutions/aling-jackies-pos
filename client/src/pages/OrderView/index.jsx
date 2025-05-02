import { useState, useEffect } from 'react';
import '../../App.css';

export default function OrderView() {
  const [data, setData] = useState({ items: [], pagination: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/items')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((responseData) => {
        console.log('API Response:', responseData); // For debugging
        setData(responseData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1>Home</h1>
      <p>Welcome to the order page!</p>
      <p>Here you can place your orders.</p>
      <div>
        <h2>Menu Items</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : data.items && data.items.length > 0 ? (
          <ul>
            {data.items.map((item, index) => (
              <li key={item.id || index}>
                {item.item_name} - ${(item.price / 100).toFixed(2)} - {item.image_path}
              </li>
            ))}
          </ul>
        ) : (
          <p>No items found.</p>
        )}
      </div>
    </>
  );
}