import axios from 'axios';

const getSpecificUser = async (userId) => {

    const response = await axios.get(`http://localhost:8000/api/v1/users/${userId}`,  {
        withCredentials: true
    })
    return response.data
}


const updateUserProfile = async (userId, formData) => {

    const response = await axios.put(`http://localhost:8000/api/v1/users/${userId}/update-profile`, formData,  {
        withCredentials: true
    })

    return response.data
}


const userManagementServices = {
    getSpecificUser,
    updateUserProfile
}

export default userManagementServices;