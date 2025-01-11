import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function PrivateRoute({ children }) {
    const token = Cookies.get('token');
    const navigate = useNavigate();

    // Check if token exists and is valid
    if (!token || token === 'undefined' || token.trim() === '' || token === '') {
        // return <Navigate to="/login" />; // Redirect to login if no token
        navigate('/login');
    }

    return children; // Render the protected component if the token is valid
}
