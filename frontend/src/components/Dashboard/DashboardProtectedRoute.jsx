import React, { useEffect, useState, } from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

const DashboardProtectedRoute = ({ childeren }) => {

    const navigate = useNavigate();
    let location = useLocation({childeren});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { user, isError, isSuccess, isLoading, message } = useSelector(state => state.auth)

    useEffect(() => {

        if (isSuccess || user) {
            setIsAuthenticated(true)
        }

        else {
            setIsAuthenticated(false)
        }

    }, [user, isError, isSuccess, message])


    return isAuthenticated ?
        (
            <Navigate to="/dashboard" state={{ from: location}} replace />
        ) : (
            navigate("/home")
        )
}

export default DashboardProtectedRoute;