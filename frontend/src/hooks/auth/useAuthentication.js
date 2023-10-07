// Create a new file named useAuthentication.js

import { useEffect, useState } from 'react';
import axios from 'axios';

function useAuthentication() {
    const [authInfo, setAuthInfo] = useState({ authenticated: false, userId: null });

    useEffect(() => {
        // Make an API request to check authentication status
        axios.get('http://localhost:8000/api/v1/auth/check-auth',
            { withCredentials: true })
            .then((response) => {
                if (response.data.isAuthenticated) {
                    // User is authenticated
                    setAuthInfo({ authenticated: true, userId: response.data.userId });
                } else {
                    // User is not authenticated
                    setAuthInfo({ authenticated: false, userId: null });
                }
            })
            .catch((error) => {
                console.error('Error checking authentication:', error);
                // Handle the error (e.g., show an error message)
            });
    }, []);

    return authInfo;
}

export default useAuthentication;
