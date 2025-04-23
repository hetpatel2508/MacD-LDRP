import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, removeProduct, updateQuantity } from '../store/slices/ProductSlice';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import TakeInputNameEmail from './TakeInputNameEmail.jsx';

export default function Cart({ OrderType }) {
    const { products, TotalAmount } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    const [showForm, setShowForm] = React.useState(false);

    const handleRemove = (id) => {
        dispatch(removeProduct(id));
        toast.success('Product removed from cart!');
    };

    const handleQuantityChange = (id, quantity) => {
        if (quantity >= 1) {
            dispatch(updateQuantity({ id, quantity }));
            toast.success('Quantity updated!');
        }
    };

    const handlePaymentBtn = async (email, name, pm) => {
        if (products.length === 0) {
            toast.error('Your cart is empty!');
            return;
        }


        products.forEach(async ele => {
            let res

            if (ele.mealItems) {
                console.log("it is meal..!");
                console.log(ele);

                res = await fetch(`http://localhost:6868/cart/meal`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM2MDc0MDkyfQ.V5oHrUQ0DGA4fqfnMGTsWU7VleELyOUk9DeJuVBhasw`,
                    },
                    body: JSON.stringify({
                        productId: ele.id,
                        quantity: ele.quantity,
                    }),
                })
            } else {
                console.log("it is not meal..!");
                console.log(ele);

                res = await fetch(`http://localhost:6868/cart`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM2MDc0MDkyfQ.V5oHrUQ0DGA4fqfnMGTsWU7VleELyOUk9DeJuVBhasw`,
                    },
                    body: JSON.stringify({
                        productId: ele.id,
                        quantity: ele.quantity,
                    }),
                })
            }

            const cartResponse = await res.json();

            if (!res.ok) {
                toast.error(cartResponse.message);
            }

        });



        try {
            const paymentMethod = pm === 'cash' ? 'CASH' : 'ONLINE';
            const ordermethod = OrderType === 'EatIn' ? 'EATIN' : 'TAKEAWAY';
            const paymentResponse = await axios.post(
                'http://localhost:6868/payment/checkout',
                {
                    amount: TotalAmount,
                    email: email,
                    name: name,
                    OrderType: ordermethod,
                    paymentMethod: paymentMethod,
                },
                { withCredentials: true }
            );

            if (paymentResponse.data.id) {
                const options = {
                    key: paymentResponse.data.key || 'rzp_test_zcmmptNWYPAudu',
                    amount: paymentResponse.data.amount,
                    currency: 'INR',
                    name: 'E-commerce Payments',
                    description: 'Test Transaction',
                    order_id: paymentResponse.data.id,
                    callback_url: 'http://localhost:6868/payment/verify',
                    prefill: {
                        name: 'Customer Name',
                        email: 'customer@example.com',
                        contact: '9999999999',
                    },
                    theme: {
                        color: '#3399cc',
                    },
                };

                const razorpay = new window.Razorpay(options);
                razorpay.open();
            } else {
                toast.error('Failed to initiate Razorpay checkout.');
            }
        } catch (err) {
            toast.error(err.message || 'Something went wrong!');
        }

    };

    const clearCartBtn = async () => {
        try {
            const res = await fetch('http://localhost:6868/cart', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM2MDc0MDkyfQ.V5oHrUQ0DGA4fqfnMGTsWU7VleELyOUk9DeJuVBhasw`,
                },
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message);
            }

            dispatch(clearCart());
            toast.success('Cart cleared!');
        } catch (err) {
            toast.error(err.message || 'Failed to clear cart.');
        }
    };

    return (
        <div className="flex justify-center py-12 px-4">
            <TakeInputNameEmail showForm={showForm} setShowForm={setShowForm} OrderType={OrderType} handlePaymentBtn={handlePaymentBtn} />

            <div className="bg-white shadow-xl rounded-lg w-full max-w-4xl p-8 md:p-12">
                <h1 className="text-4xl font-semibold text-gray-800 text-center mb-8">Your Cart</h1>

                {/* Empty Cart Message */}
                {products.length === 0 ? (
                    <div className="text-center text-xl font-medium text-gray-600">
                        Your cart is empty! 😔
                    </div>
                ) : (
                    <>
                        {/* Cart Items */}
                        <div className="space-y-5">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex items-center justify-between bg-gray-100 p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                                >
                                    <div className="flex items-center gap-6">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-24 h-24 object-cover rounded-lg"
                                        />
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
                                            <p className="text-gray-600">Price: ₹{product.price}</p>
                                            <div className="mt-2 flex items-center">
                                                <span className="text-sm text-gray-500 mr-2">Qty:</span>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={product.quantity}
                                                    onChange={(e) =>
                                                        handleQuantityChange(product.id, parseInt(e.target.value))
                                                    }
                                                    className="w-20 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <p className="text-lg font-semibold text-gray-800">
                                            ₹{product.price * product.quantity}
                                        </p>
                                        <button
                                            onClick={() => handleRemove(product.id)}
                                            className="text-red-600 hover:text-red-700 text-sm mt-2 focus:outline-none"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Total Amount */}
                        <div className="border-t border-gray-300 mt-8 pt-6">
                            <h2 className="text-2xl font-semibold text-gray-800 text-right">
                                Total Amount: ₹{TotalAmount}
                            </h2>
                        </div>

                        {/* Checkout Button */}
                        <div className="text-center mt-8">
                            <button
                                onClick={()=> setShowForm(true)}
                                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-lg font-bold rounded-md shadow-lg hover:scale-105 transform transition duration-300 ease-in-out focus:outline-none"
                            >
                                Proceed to Checkout
                            </button>
                        </div>

                        {/* Clear Button */}
                        <div className="text-center mt-8">
                            <button
                                onClick={clearCartBtn}
                                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-lg font-bold rounded-md shadow-lg hover:scale-105 transform transition duration-300 ease-in-out focus:outline-none"
                            >
                                Clear Cart
                            </button>
                        </div>

                    </>
                )}
                <Toaster />
            </div>
        </div>
    );
}
