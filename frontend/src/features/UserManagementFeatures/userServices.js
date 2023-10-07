import axios from 'axios';

const getSpecificUser = async (userId) => {

    const response = await axios.get(`http://localhost:8000/api/v1/users/${userId}`,  {
        withCredentials: true
    })
    return response.data
}



const userManagementServices = {
    getSpecificUser
}

export default userManagementServices;