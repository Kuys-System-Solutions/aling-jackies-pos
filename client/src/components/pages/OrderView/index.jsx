import { useState, useEffect } from 'react';
import '../../../App.css';

export default function OrderView() {
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
      <h1>Home</h1>
      <p>Welcome to the order page!</p>
      <p>Here you can place your orders.</p>
      <div>
        Here's data from Flask:
        {typeof data === 'undefined' ? (
          <p>Loading...</p>
        ) : (
          <p>{data.message}</p>
        )}
      </div>
    </>
  );
}
