import { useState, useEffect } from 'react';
import '../../App.css';

export default function OrderView() {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch('/api/items')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <>
      <h1>Home</h1>
      <p>Welcome to the order page!</p>
      <p>Here you can place your orders.</p>
      <div>
        Here's data from Flask:
        {typeof data === 'undefined' ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {data.map((item, index) => (
              <li key={index}>
                {item.item_name} - {item.price} - {item.image_path}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
