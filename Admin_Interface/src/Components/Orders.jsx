import React from "react";

export default function Orders() {
  const orders = [
    {
      _id: "45",
      email: "alicewong@gmail.com",
      items: [
        { itemName: "Chicken Wings", quantity: 4, itemPrice: 120 },
        { itemName: "Coleslaw", quantity: 1, itemPrice: 30 },
      ],
      status: "Processing",
    },
    {
      _id: "46",
      email: "bobmartin@gmail.com",
      items: [
        { itemName: "Fish Tacos", quantity: 3, itemPrice: 110 },
        { itemName: "Lemonade", quantity: 2, itemPrice: 45 },
        { itemName: "Lemonade", quantity: 2, itemPrice: 45 },
        { itemName: "Lemonade", quantity: 2, itemPrice: 45 },
        { itemName: "Lemonade", quantity: 2, itemPrice: 45 },
        { itemName: "Lemonade", quantity: 2, itemPrice: 45 },
        { itemName: "Lemonade", quantity: 2, itemPrice: 45 },
        { itemName: "Lemonade", quantity: 2, itemPrice: 45 },
        { itemName: "Lemonade", quantity: 2, itemPrice: 45 },
        { itemName: "Lemonade", quantity: 2, itemPrice: 45 },
        { itemName: "Lemonade", quantity: 2, itemPrice: 45 },
      ],
      status: "Ready",
    },
    {
      _id: "47",
      email: "carolking@gmail.com",
      items: [
        { itemName: "Steak", quantity: 2, itemPrice: 250 },
        { itemName: "Mashed Potatoes", quantity: 1, itemPrice: 60 },
      ],
      status: "Delivered",
    },
    {
      _id: "48",
      email: "daniellewong@gmail.com",
      items: [
        { itemName: "Sushi", quantity: 5, itemPrice: 300 },
        { itemName: "Green Tea", quantity: 1, itemPrice: 40 },
      ],
      status: "Pending",
    },
    {
      _id: "49",
      email: "ethansmith@gmail.com",
      items: [
        { itemName: "Veggie Wrap", quantity: 3, itemPrice: 90 },
        { itemName: "Smoothie", quantity: 1, itemPrice: 80 },
      ],
      status: "Completed",
    },
    {
      _id: "50",
      email: "frankjohnson@gmail.com",
      items: [
        { itemName: "BBQ Ribs", quantity: 2, itemPrice: 200 },
        { itemName: "Cornbread", quantity: 2, itemPrice: 40 },
      ],
      status: "Processing",
    },
    {
      _id: "51",
      email: "gracelee@gmail.com",
      items: [
        { itemName: "Pancakes", quantity: 4, itemPrice: 100 },
        { itemName: "Orange Juice", quantity: 2, itemPrice: 35 },
      ],
      status: "Ready",
    },
    {
      _id: "52",
      email: "henryclark@gmail.com",
      items: [
        { itemName: "Beef Burger", quantity: 3, itemPrice: 110 },
        { itemName: "Onion Rings", quantity: 1, itemPrice: 45 },
      ],
      status: "Delivered",
    },
    {
      _id: "53",
      email: "irisluna@gmail.com",
      items: [
        { itemName: "Chicken Curry", quantity: 2, itemPrice: 150 },
        { itemName: "Naan Bread", quantity: 3, itemPrice: 20 },
      ],
      status: "Pending",
    },
    {
      _id: "54",
      email: "jacksonlee@gmail.com",
      items: [
        { itemName: "Taco Salad", quantity: 2, itemPrice: 130 },
        { itemName: "Iced Tea", quantity: 1, itemPrice: 30 },
      ],
      status: "Completed",
    },
    {
      _id: "55",
      email: "karenwilson@gmail.com",
      items: [
        { itemName: "Lasagna", quantity: 1, itemPrice: 180 },
        { itemName: "Caesar Salad", quantity: 1, itemPrice: 50 },
      ],
      status: "Processing",
    },
    {
      _id: "56",
      email: "larryadams@gmail.com",
      items: [
        { itemName: "BBQ Chicken", quantity: 2, itemPrice: 200 },
        { itemName: "Cola", quantity: 3, itemPrice: 30 },
      ],
      status: "Ready",
    },
    {
      _id: "57",
      email: "marthastewart@gmail.com",
      items: [
        { itemName: "Spaghetti Bolognese", quantity: 2, itemPrice: 120 },
        { itemName: "Garlic Bread", quantity: 1, itemPrice: 35 },
      ],
      status: "Delivered",
    },
    {
      _id: "58",
      email: "nathanbrooks@gmail.com",
      items: [
        { itemName: "Cheese Pizza", quantity: 1, itemPrice: 150 },
        { itemName: "Soda", quantity: 2, itemPrice: 25 },
      ],
      status: "Pending",
    },
    {
      _id: "59",
      email: "oliviajackson@gmail.com",
      items: [
        { itemName: "Grilled Cheese", quantity: 3, itemPrice: 70 },
        { itemName: "Tomato Soup", quantity: 1, itemPrice: 40 },
      ],
      status: "Completed",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col overflow-x-hidden items-center">
      <div>
        <h1 className="text-4xl font-semibold text-center mb-4 font-sans py-4">
          Order Details
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {orders.map((order) => {
          // Dynamically calculate total price
          const totalPrice = order.items.reduce(
            (sum, item) => sum + item.quantity * item.itemPrice,
            0
          );

          const totalQuantity = order.items.reduce(
            (sum, item) => sum + item.quantity,
            0
          );

          return (
            <div
              key={order._id}
              className="w-[300px] h-[390px] bg-gray-100 border rounded-lg p-4 shadow-md flex flex-col gap-4"
            >
              {/* Order ID */}
              <div className="text-lg font-bold">Order ID: {order._id}</div>

              {/* Customer Email */}
              <div className="text-gray-600">{order.email}</div>

              {/* Item Details */}
              <div className="flex flex-col gap-2 border rounded-lg p-2 overflow-y-auto min-h-[130px]">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border-b last:border-b-0 pb-2 last:pb-0"
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                      {/* Placeholder for image */}
                      <span className="text-sm text-gray-500">Img</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{item.itemName}</div>
                      <div className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </div>
                    </div>
                    <div className="font-bold">
                      ${item.quantity * item.itemPrice}
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Price */}
              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold">Items</div>
                <div className="text-xl font-bold">{totalQuantity}</div>
              </div>

              {/* Total Price */}
              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold">Total</div>
                <div className="text-xl font-bold">${totalPrice}</div>
              </div>

              {/* Order Status */}
              <div
                className={`py-1 px-3 rounded-full text-center text-white ${order.status === "Pending"
                    ? "bg-yellow-500"
                    : order.status === "Completed"
                      ? "bg-green-500"
                      : "bg-gray-500"
                  }`}
              >
                {order.status}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
