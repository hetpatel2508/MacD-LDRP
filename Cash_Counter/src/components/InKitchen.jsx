import React, { useState, useEffect } from "react";

export default function InKitchen({ Products, handleChangesInStatus }) {
    const [timers, setTimers] = useState({});
    const [toggled, setToggled] = useState({});
    const [canSave, setCanSave] = useState({});

    useEffect(() => {
        const interval = setInterval(() => {
            setTimers((prevTimers) => {
                const newTimers = { ...prevTimers };
                for (const orderId in newTimers) {
                    newTimers[orderId] += 1;
                }
                return newTimers;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const initialTimers = {};
        const initialToggles = {};
        const initialCanSave = {};

        Products.forEach((order) => {
            initialTimers[order.id] = 0;
            initialToggles[order.id] = {};
            order.OrderItem.forEach((item) => {
                initialToggles[order.id][item.product.id] = false;
            });
            initialCanSave[order.id] = false;
        });

        setTimers(initialTimers);
        setToggled(initialToggles);
        setCanSave(initialCanSave);
    }, [Products]);

    const handleToggle = (orderId, itemId) => {
        setToggled((prevToggled) => {
            const newToggled = { ...prevToggled };
            newToggled[orderId][itemId] = !newToggled[orderId][itemId];

            const allToggled = Object.values(newToggled[orderId]).every((state) => state);
            setCanSave((prevCanSave) => ({
                ...prevCanSave,
                [orderId]: allToggled,
            }));

            return newToggled;
        });
    };

    const handleSave = (orderId) => {
        console.log(`Save clicked for Order ID: ${orderId}`);
        handleSaveChanges(orderId);
    };

    return (
        <div className="w-full h-full flex flex-col overflow-x-hidden items-center">
            <div>
                <h1 className="text-4xl font-semibold text-center mb-4 font-sans py-4">
                    In Kitchen - Order Details
                </h1>
            </div>
            <div className="w-[89%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ml-4 ">
                {Products.map((order) => {
                    const timer = timers[order.id];
                    return (
                        <div
                            key={order.id}
                            className="w-[290px] h-auto mt-9 bg-gray-100 border rounded-lg p-4 shadow-md flex flex-col gap-4 relative"
                        >
                            {/* Timer */}
                            <div
                                className={`absolute top-2 right-2 text-sm font-bold ${timer >= 60
                                        ? "text-red-500 animate-blink"
                                        : "text-gray-600"
                                    }`}
                            >
                                {timer}s
                            </div>

                            {/* Order ID */}
                            <div className="text-lg font-bold">Order ID: {order.id}</div>

                            {/* Order Number */}
                            <div className="text-gray-600">Order Number: {order.orderNumber}</div>

                            {/* Item Details */}
                            <div className="flex flex-col gap-2 border rounded-lg p-2 overflow-y-auto min-h-[130px] max-h-[150px]">
                                {order.OrderItem.map((item,index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 border-b last:border-b-0 pb-2 last:pb-0"
                                    >
                                        {/* Item Image */}
                                        <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                        </div>

                                        {/* Item Details */}
                                        <div className="flex-1">
                                            <div className="font-semibold text-[14.8px]">{item.product.name}</div>
                                            <div className="text-sm text-gray-500">
                                                Quantity: {item.quantity}
                                            </div>
                                        </div>

                                        {/* Toggle Button */}
                                        <div
                                            className={`w-[50px] h-[30px] flex items-center cursor-pointer ${toggled[order.id] &&
                                                    toggled[order.id][item.product.id]
                                                    ? "bg-green-500"
                                                    : "bg-gray-300"
                                                } rounded-full p-1`}
                                            onClick={() => handleToggle(order.id, item.product.id)}
                                        >
                                            <div
                                                className={`w-[24px] h-[24px] rounded-full bg-white shadow-md transform ${toggled[order.id] &&
                                                        toggled[order.id][item.product.id]
                                                        ? "translate-x-[20px]"
                                                        : "translate-x-0"
                                                    } transition-transform`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Save Button */}
                            <div className="flex justify-center items-center mt-4">
                                <button
                                    className={`w-full py-2 font-semibold rounded-lg ${canSave[order.id]
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        }`}
                                    disabled={!canSave[order.id]}
                                    onClick={() => {handleChangesInStatus(order.id)}}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
