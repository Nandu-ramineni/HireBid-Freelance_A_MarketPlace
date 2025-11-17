import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = () => {
    const token = Cookies.get('accessToken');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const decoded = jwtDecode(token);
        const { expiresIn } = decoded;
        const now = Math.floor(Date.now() / 1000);

        if (expiresIn < now) {
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            return <Navigate to="/login" replace />;
        }

        return <Outlet />; // ✅ Render the nested route
    } catch (err) {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;
