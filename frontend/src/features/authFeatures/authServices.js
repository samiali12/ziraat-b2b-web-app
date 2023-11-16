import axios from 'axios';


// Register user
const register = async (userData) => {

    const response = await axios.post("http://localhost:8000/api/v1/user", userData,  {
        withCredentials: true
    })
    return response.data
}

// login 
const login = async (userData) => {
    const response = await axios.post("http://localhost:8000/api/v1/users/login", userData, {
        withCredentials: true
    })

    return response.data
}


// Logout user
const logout = async () => {
    const response = await axios.post("http//localhost:8000/api/v1/users/logout")
}

const passwordResetUrl = async (email) => {

    const response = await axios.post("http://localhost:8000/api/v1/password/forget/", email)

    return response.data
}


const updatePassword = async (data) => {


    const response = await axios.put(`http://localhost:8000/api/v1/users/update-password/${data.userId}`, data.userData)
    return response.data
}

const resetPassword = async (data) => {

    const response = await axios.put(`http://localhost:8000/api/v1/password/reset/${data.token}`,
        { "password": data.password })
    return response.data
}


const sendEmailVerification = async (email) => {
    const response = await axios.post("http://localhost:8000/api/v1/sendEmailVerification", {"email": email})
    return response.data
}


const authServices = {
    register,
    login,
    logout,
    passwordResetUrl,
    resetPassword,
    updatePassword,
    sendEmailVerification,
}

export default authServices