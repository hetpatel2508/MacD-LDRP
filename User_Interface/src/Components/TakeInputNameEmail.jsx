import React, { useState } from 'react';
import CashLogo from '../assets/cashlogo.svg'
import OnlineLogo from '../assets/onlinelogo.svg'
import CancelLogo from '../assets/cancelLogo.svg'

const PaymentForm = ({ showForm, setShowForm, handlePaymentBtn, OrderType }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [formErrors, setFormErrors] = useState({ name: '', email: '' });

    // Validate Name and Email manually
    const validateForm = () => {
        let isValid = true;
        let errors = { name: '', email: '' };

        // Name validation
        if (!name) {
            errors.name = 'Name is required';
            isValid = false;
        }

        // Email validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!emailPattern.test(email)) {
            errors.email = 'Please enter a valid email';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            alert('Form submitted successfully!');
            console.log({ name, email, OrderType });
        }
    };

    const closeWindow = () => {
        setEmail('');
        setName('');
        setFormErrors({ name: '', email: '' });
        setShowForm(false);
    }

    return (
        <div className='w-[100vw] h-[100vh] fixed z-50 left-0 top-0 bg-transparent flex items-center justify-center'
            style={{ display: showForm ? 'flex' : 'none' }}>

            {/* Background blur effect */}
            <div className='absolute inset-0 bg-black opacity-50 backdrop-blur-md'></div>

            <div className="w-[400px] border border-black mx-auto p-6 bg-white rounded-xl shadow-lg relative z-10">
                <div className='w-[35px] h-[35px] absolute right-5 top-5 rounded-full border border-black flex items-center justify-center cursor-pointer' onClick={closeWindow}>
                    <img src={CancelLogo} className='w-[30px] h-[30px]'></img>
                </div>
                <h2 className="text-xl font-semibold text-center mb-4">Payment Form</h2>

                {/* Name Field */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="block w-full border border-gray-300 rounded-md p-2"
                    />
                    {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                </div>

                {/* Email Field */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="block w-full border border-gray-300 rounded-md p-2"
                    />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                </div>

                {/* Payment Method Selection */}
                <div className="mb-6">
                    <div className="flex justify-between space-x-4">
                        <div
                            className={`w-1/2 p-4 pb-9 rounded-md border text-center cursor-pointer relative flex items-center justify-center ${paymentMethod === 'cash' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
                            onClick={() => setPaymentMethod('cash')}
                        >
                            {/* <img src='https://imgs.search.brave.com/RYqzEC2Ft_vH1LjcgEsN7QmgUoPSRTzzLMEcODd34jY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tYXhj/ZG4uaWNvbnM4LmNv/bS9wYWNrcy9wcmV2/aWV3LWljb24vYnVz/aW5lc3Muc3Zn'></img> */}

                            <img src={CashLogo} style={paymentMethod === 'cash' ? { filter: 'invert(1)' } : {}} className='w-[90px] h-[90px]'></img>

                            <span className='absolute bottom-2'>Cash</span>
                        </div>
                        <div
                            className={`w-1/2 p-4 pb-9 rounded-md border text-center cursor-pointer relative flex items-center justify-center ${paymentMethod === 'online' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
                            onClick={() => setPaymentMethod('online')}
                        >
                            {/* <img src='https://imgs.search.brave.com/RYqzEC2Ft_vH1LjcgEsN7QmgUoPSRTzzLMEcODd34jY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tYXhj/ZG4uaWNvbnM4LmNv/bS9wYWNrcy9wcmV2/aWV3LWljb24vYnVz/aW5lc3Muc3Zn'></img> */}

                            <img src={OnlineLogo} style={paymentMethod === 'online' ? { filter: 'invert(1)' } : {}} className='w-[90px] h-[90px]'></img>

                            <span className='absolute bottom-2'>Online/Card</span>
                        </div>

                    </div>
                </div>

                {/* Submit Button */}
                <button
                    onClick={() => { handlePaymentBtn(email, name, paymentMethod) }}
                    disabled={!name || !email || !paymentMethod || formErrors.name || formErrors.email}
                    className={`w-full p-3 text-white rounded-md ${!name || !email || !paymentMethod || formErrors.name || formErrors.email ? 'bg-gray-400' : 'bg-indigo-600'} cursor-pointer`}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default PaymentForm;




