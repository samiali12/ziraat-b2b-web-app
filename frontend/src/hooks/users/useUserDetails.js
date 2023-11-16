import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../features/UserManagementFeatures/userManageSlice';
import useAuthentication from '../auth/useAuthentication';

function useUserDetails() {
    const { authenticated, userId } = useAuthentication(); // Use the authentication custom hook

    const dispatch = useDispatch();
    const { user, isSuccess, isError } = useSelector((state) => state.userManage); // Replace 'state.user' with your actual Redux state path
    const [error, setError] = useState(null); // State variable to store error information

    useEffect(() => {
        const getUser = async () => {
            if(authenticated && userId){
                try {
                    dispatch(getUserDetails(userId));
                } catch (error) {
                    setError(error.message); // Set the error state if an error occurs during the API request
                }
            }
        };

        getUser();
    }, []);

    return { user, isSuccess, isError, error }; // Include the error state in the returned object
}

export default useUserDetails;

