import AuthNavigation from "./AuthNavigation";
import HeroSection from "./HeroSection";
import NavigationBar from "./NavigationBar"
import React, { useEffect, useState } from 'react'
import axios from "axios";

const Header = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        // Check authentication status when the component mounts
        const checkAuthentication = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/auth/check-auth',
                    { withCredentials: true });
                // Assuming your API returns a status or data indicating authentication status
                if (response.data.isAuthenticated) {
                    setIsAuthenticated(true)
                    setUserId(response.data.userId)
                }

            } catch (error) {

            }
        };

        checkAuthentication();
    }, []);

    return (
        <div>
            {
                isAuthenticated ? (
                    <AuthNavigation />
                ) : (
                    <>
                        <NavigationBar />
                        <HeroSection />
                    </>
                )
            }

        </div>

    )
}

export default Header;