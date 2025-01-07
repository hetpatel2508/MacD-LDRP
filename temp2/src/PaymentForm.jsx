import React from 'react';
import axios from 'axios';
import './App.css';

export default function PaymentForm() {
    const [TotalAmount, setTotalAmount] = React.useState(0);

    const handlePayment = async () => {
        try {
            if (TotalAmount !== 0) {
                // Call the backend API to initiate the Razorpay checkout process

                const response = await axios.post('http://localhost:6868/payment/checkout', {
                    amount: TotalAmount * 100, // Razorpay expects the amount in paise (smallest currency unit)
                }, {
                    withCredentials: true,
                });

                if (response.data.id) {
                    // Proceed to open Razorpay checkout
                    const options = {
                        // key: response.data.key,
                        key: 'rzp_test_zcmmptNWYPAudu',
                        amount: response.data.amount,
                        currency: 'INR',
                        name: 'Learning Ecommerce Payments',
                        description: 'Test Transaction',
                        image: 'https://your-logo-url.jpg',
                        order_id: response.data.id,
                        callback_url: 'http://localhost:6868/payment/verify',
                        prefill: {
                            name: 'Customer Name',
                            email: 'customer@example.com',
                            contact: '9999999999',
                        },
                        notes: {
                            address: 'Razorpay Corporate Office',
                        },
                        theme: {
                            color: '#3399cc',
                        },
                    };

                    const razorpay = new window.Razorpay(options);
                    razorpay.open();
                }
            } else {
                console.error('Your cart is empty!');
            }
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    // const handlePayment = async () => {
    //     // const data = await axios.get('http://localhost:6868/cart', {
    //     //     headers: {
    //     //         'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM2MDc0MDkyfQ.V5oHrUQ0DGA4fqfnMGTsWU7VleELyOUk9DeJuVBhasw'
    //     //     }
    //     // })
    //     const data = await fetch('http://localhost:6868/cart', {
    //         method: 'GET',
    //         headers: {
    //             'content-type': 'application/json',
    //             'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM2MDc0MDkyfQ.V5oHrUQ0DGA4fqfnMGTsWU7VleELyOUk9DeJuVBhasw'
    //         },
    //         credentials: 'include'
    //     }).then((res) => res.json()).then((data) => console.log(data)).catch((err) => console.log(err));
    //     console.log(data)
    // }

    return (
        <div className="payment-form">
            <h2>Make a Payment</h2>
            <input
                type="number"
                placeholder="Enter Amount"
                value={TotalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
            />
            <button onClick={handlePayment}>
                Pay Now
            </button>
        </div>
    );
}
