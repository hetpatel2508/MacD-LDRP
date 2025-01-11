import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function AuthForm() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [serverErrorSignUp, setServerErrorSignUp] = useState("");
    const [serverErrorLogIn, setServerErrorLogIn] = useState("");

    // Toggle password visibility
    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
    const toggleConfirmPasswordVisibility = () =>
        setConfirmPasswordVisible(!confirmPasswordVisible);

    // Handle form submission for login
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Prepare user login data
            const user = { email, password };

            // Use POST to send login data
            const response = await fetch("http://localhost:6868/user/login", {
                method: "POST", // Changed to POST
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user), // Body can only be sent with POST/PUT
            });

            // Parse JSON response
            const data = await response.json();

            if (response.ok) {
                // Save the token in cookies
                console.log("Login successful:", data);
                Cookies.set("token", data.token);
                navigate("/");
            } else {
                // Handle non-2xx responses
                const { message, errorCode } = data;
                console.log("Error message:", message, "Error code:", errorCode);
                setServerErrorLogIn(`${message} (${errorCode})`);
            }
        } catch (error) {
            // Handle network or other errors
            console.error("Network or other error:", error);
            setServerErrorLogIn("An error occurred. Please check your connection and try again.");
        }
    };


    // Handle form submission for signup
    const handleSignup = async (e) => {
        e.preventDefault();
        const user = { name, email, password };

        try {
            const response = await fetch("http://localhost:6868/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            const data = await response.json();

            if (response.status === 201 || response.status === 200) {
                console.log("Signup successful:", data);
                toggleAuthMode();
            } else {
                const message = data.message;
                const errorCode = data.errorCode;

                console.log(message, errorCode);

                setServerErrorSignUp(`${message} (${errorCode})`);
                console.error("Error during signup:", data);
            }

        } catch (error) {
            console.error("Network or other error:", error);
            setServerErrorSignUp("An error occurred. Please check your connection and try again.");
        }
    };



    // Reset form fields when switching between login and signup
    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setName(""); // Clear name
        setEmail(""); // Clear email
        setPassword(""); // Clear password
        setConfirmPassword(""); // Clear confirm password
        setPasswordVisible(false); // Reset password visibility
        setConfirmPasswordVisible(false); // Reset confirm password visibility
        setServerErrorSignUp(""); // Clear signup error
        setServerErrorLogIn(""); // Clear login error
    };

    // Validate form fields
    useEffect(() => {
        if (isLogin) {
            // Login validation: Email and Password are required
            setIsFormValid(email.trim() !== "" && password.trim() !== "");
        } else {
            // Signup validation: All fields required and passwords must match
            setIsFormValid(
                name.trim() !== "" &&
                email.trim() !== "" &&
                password.trim() !== "" &&
                password === confirmPassword
            );
        }
    }, [isLogin, name, email, password, confirmPassword]);

    return (
        <div className="w-full h-full fixed top-0 left-0 z-20 bg-white">
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                    <h2 className="text-2xl font-bold text-center mb-6">
                        {isLogin ? "Login" : "Signup"}
                    </h2>
                    <form
                        onSubmit={isLogin ? handleLogin : handleSignup}
                        className="space-y-6"
                    >
                        {!isLogin && (
                            <div>
                                <label className="block text-gray-700 font-medium">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        )}
                        <div>
                            <label className="block text-gray-700 font-medium">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Password</label>
                            <div className="relative">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <span
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-500"
                                >
                                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                        {!isLogin && (
                            <div>
                                <label className="block text-gray-700 font-medium">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={confirmPasswordVisible ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                    <span
                                        onClick={toggleConfirmPasswordVisibility}
                                        className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-500"
                                    >
                                        {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                                {serverErrorSignUp && (
                                    <div className="w-full min-h-[25px] flex items-center text-red-600 mt-5">
                                        * {serverErrorSignUp}
                                    </div>
                                )}
                            </div>
                        )}
                        {serverErrorLogIn && (
                            <div className="w-full min-h-[25px] flex items-center text-red-600 mt-5">
                                * {serverErrorLogIn}
                            </div>
                        )}
                        <button
                            type="submit"
                            disabled={!isFormValid} // Disable button if form is invalid
                            className={`w-full py-2 font-bold rounded-md transition duration-300 ${isFormValid
                                ? "bg-blue-500 text-white hover:bg-blue-600"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                        >
                            {isLogin ? "Login" : "Signup"}
                        </button>
                    </form>

                    <p className="text-center text-gray-600 mt-4">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                        <span
                            onClick={toggleAuthMode}
                            className="text-blue-500 cursor-pointer hover:underline"
                        >
                            {isLogin ? "Signup" : "Login"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );

};

export default AuthForm;
