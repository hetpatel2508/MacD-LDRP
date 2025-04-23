import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { addProduct } from '../store/slices/ProductSlice';

export default function ProductDetails() {
    const { state } = useLocation();
    const { product, category, isMeal } = state;
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        // console.log("Added to cart:", { product, category, selectedQuantity: quantity });
        if (isMeal === true) {
            dispatch(addProduct({ ...product, quantity: quantity, isMeal: true }));
        } else {
            dispatch(addProduct({ ...product, quantity: quantity, }));
        }
    };

    const incrementQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    return (
        <div className=" w-full h-full flex items-center justify-center p-6">
            <div className="flex flex-col mt-[42%] lg:flex-row bg-white border absolute rounded-2xl shadow-2xl overflow-hidden w-full max-w-6xl">
                {/* Product Image Section */}
                <div className=" w-[600px] p-6 flex items-center justify-center">
                    <img
                        src={product?.image}
                        alt={product?.name}
                        className="w-full max-h-[400px] object-contain rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
                    />
                </div>

                {/* Product Details Section */}
                <div className="w-[60%] p-10 flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">{product?.name}</h1>
                        <p className="text-lg font-medium text-gray-600">
                            <span className="font-semibold">Category:</span> {category}
                        </p>
                        <p className="text-2xl font-bold text-blue-600 mt-4">₹{product?.price}</p>
                        <p className="text-lg font-medium text-gray-600 mt-2">
                            <span className="font-semibold">Available Items:</span> {product?.quantity}
                        </p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4 mt-6">
                        <span className="text-lg font-semibold">Quantity:</span>
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                            <button
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-lg transition-colors duration-200"
                                onClick={decrementQuantity}
                            >
                                -
                            </button>
                            <div className="px-6 py-2 text-lg font-semibold">{quantity}</div>
                            <button
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-lg transition-colors duration-200"
                                onClick={incrementQuantity}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="mt-8">
                        <button
                            className="w-full lg:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-lg font-bold rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
