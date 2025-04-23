import React from 'react';
import io from 'socket.io-client';
import Navbar from './components/Navbar';
import Orders from './components/Orders';
import InKitchen from './components/InKitchen';

const socket = io('http://localhost:6868');

export default function App() {
  const [products, setProducts] = React.useState([]);
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    socket.on('initializeCashCounterOrders', (data) => {
      setProducts(data);
      console.log(data);
    });

    socket.on('OrderisPaidUpdated', (id) => {
      setProducts((prevProducts) => {
        // Filter out the product with the specified ID
        return prevProducts.filter((product) => product.id !== id);
      });
      console.log('Product removed with ID:', id);
    });

    socket.on('OrderCreated', (product) => setProducts((prev) => [...prev, product]));

    socket.on('initializeInKitchenOrders', (data) => {
      setOrders(data);
      console.log(data);
    });

    socket.on('OrderStatusUpdated', (id) => {
      setOrders((prevOrders) => {
        // Filter out the product with the specified ID
        return prevOrders.filter((product) => product.id !== id);
      });
      console.log('Product removed with ID:', id);
    });

    socket.on('OrderAddToInKitchen', (product) => setOrders((prev) => [...prev, product]));

    return () => {
      socket.off('initializeCashCounterOrders');
      socket.off('OrderisPaidUpdated');
      socket.off('OrderCreated');
      socket.off('initializeInKitchenOrders');
      socket.off('OrderStatusUpdated');
      socket.off('OrderAddToInKitchen');
    };
  }, []);

  const handleChangesInStatus = async (myId) => {
    const res = await fetch(`http://localhost:6868/order/ispaid/${myId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM2MDc0MDkyfQ.V5oHrUQ0DGA4fqfnMGTsWU7VleELyOUk9DeJuVBhasw`,
      },
      body: JSON.stringify({ isPaid: true }),
    });
    const data = res.json();
    if (!res.ok) {
      console.log(data.message + '(' + data.errorCode + ')');
    }
  };

  const handleChangesInStatusInKitchen = async (myId) => {
    const res = await fetch(`http://localhost:6868/order/${myId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM2MDc0MDkyfQ.V5oHrUQ0DGA4fqfnMGTsWU7VleELyOUk9DeJuVBhasw`,
      },
      body: JSON.stringify({ status: 'READY' }),
    });
    const data = res.json();
    if (!res.ok) {
      console.log(data.message + '(' + data.errorCode + ')');
    } else {
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== myId));
    }
  };

  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="w-full max-h-[calc(100%-80px)] ">
        <div className="w-full h-full flex items-center justify-center relative">
          <div className="h-full w-full mt-[80px]  ">
            <Orders Products={products} handleChangesInStatus={handleChangesInStatus} />
            {/* <InKitchen Products={orders} handleChangesInStatus={handleChangesInStatusInKitchen} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
