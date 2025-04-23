import React from "react";

export default function Orders({ Products, handleChangesInStatus }) {

  return (
    <div className="w-full h-full flex flex-col overflow-x-hidden items-center">
      <div>
        <h1 className="text-4xl font-semibold text-center mb-4 font-sans py-4">
          Order Details
        </h1>
      </div>
      <div className="w-[92%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ml-4 gap-4">
        {Products.map((order) => {
          return (
            <div
              key={order.id}
              className="w-[290px] h-auto mt-9 bg-gray-100 border rounded-lg p-4 shadow-md flex flex-col gap-4"
            >
              {/* Order ID */}
              <div className="text-lg font-bold">Order ID: {order.id}</div>

              {/* Order Number */}
              <div className="text-gray-600">Order Number: {order.orderNumber}</div>

              {/* User ID */}
              {/* <div className="text-gray-600">User ID: {order.userId}</div> */}

              {/* Item Details */}
              <div className="flex flex-col gap-2 border rounded-lg p-2 overflow-y-auto min-h-[130px] max-h-[150px]">
                
                
                {order.OrderItem.map((item, index) => (
                  <div
                  key={index}
                  className="flex items-center gap-4 border-b last:border-b-0 pb-2 last:pb-0"
                  >
                    {
                      item.product && (
                        <div className="flex items-center gap-4 border-b last:border-b-0 pb-2 last:pb-0">
                          <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-[14.8px]">{item.product.name}</div>
                            <div className="text-sm text-gray-500">
                              Qty: {item.quantity}
                            </div>
                          </div>
                          <div className="font-bold">${item.price}</div>
                        </div>
                      )
                    }
                    {
                      item.meal && (
                        <div className="flex items-center gap-4 border-b last:border-b-0 pb-2 last:pb-0">
                          <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                            <img
                              src={item.meal.image}
                              alt={item.meal.name}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-[14.8px]">{item.meal.name}</div>
                            <div className="text-sm text-gray-500">
                              Qty: {item.quantity}
                            </div>
                          </div>
                          <div className="font-bold">${item.price}</div>
                        </div>
                      )
                    }
                  </div>
                ))}

                
              </div>

              {/* Total Quantity */}
              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold">Items</div>
                <div className="text-xl font-bold">{order.totalQuantity}</div>
              </div>

              {/* Total Price */}
              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold">Total</div>
                <div className="text-xl font-bold">${order.netAmount}</div>
              </div>

              {/* Payment Status */}
              <div
                className={`py-1 px-3 rounded-full text-center text-white ${order.isPaid ? "bg-green-500" : "bg-red-500"
                  }`}
                onClick={() => { handleChangesInStatus(order.id) }}
              >
                {order.isPaid ? "Paid" : "Not Paid"}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
