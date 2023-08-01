import axios from 'axios';

const API_URL = "/api/v1/register/"

// Register user
const register = async (userData) => {

    const response = await axios.post("http://localhost:8000/api/v1/register/",userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// login 
const login = async (userData) => {

    const response = await axios.post("http://localhost:8000/api/v1/login/",userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}


// Logout user
const logout = async () => {
    localStorage.removeItem('user')
}

const passwordResetUrl = async (email) => {

    const response = await axios.post("http://localhost:8000/api/v1/password/forget/",email)

    return response.data
}


const resetPassword = async (data) => {

    const response = await axios.put(`http://localhost:8000/api/v1/password/reset/${data.token}`,
    {"password": data.password})

    console.log(response.data)
    return response.data
}

const authServices = {
    register,
    login,
    logout,
    passwordResetUrl,
    resetPassword
}

export default authServices