import React from 'react';

export default function Products() {
    const categories = ["All", "Veg", "Chicken", "Fish", "Egg"];

    const products = [
        {
            id: 1,
            name: "Crispy Veggie Burger Medium Meal",
            price: 265.71,
            img: "https://via.placeholder.com/150",
        },
        {
            id: 2,
            name: "McCrispy Chicken Medium Meal",
            price: 284.76,
            img: "https://via.placeholder.com/150",
        },
        {
            id: 3,
            name: "Peppery Chicken Surprise Burger",
            price: 265.21,
            img: "https://via.placeholder.com/150",
        },
        {
            id: 4,
            name: "McSpicy Premium Veg Medium Meal",
            price: 335.71,
            img: "https://via.placeholder.com/150",
        },
        {
            id: 5,
            name: "McSpicy Premium Chicken Medium Meal",
            price: 335.39,
            img: "https://via.placeholder.com/150",
        },
        {
            id: 6,
            name: "McSpicy Paneer Medium Meal",
            price: 256.20,
            img: "https://via.placeholder.com/150",
        },
    ];

    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-gray-100">
            {/* Header */}
            

            {/* Sidebar and Main Content */}
            <div className="flex w-full">
                {/* Sidebar */}
                

                {/* Products Section */}
                <div className="flex-1 p-8">
                    <h1 className="text-2xl font-semibold mb-4">Value Meals</h1>
                    <div className="grid grid-cols-5 text-center gap-6 ">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-103 transition-all duration-300 hover:shadow-2xl"
                            >
                                <img
                                    src={product.img}
                                    alt={product.name}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-lg font-bold">{product.name}</h2>
                                    <p className="text-gray-600">₹{product.price.toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cart */}
               
            </div>
        </div>
    );
}
