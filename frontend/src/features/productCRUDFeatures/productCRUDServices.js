import axios from "axios"



const getAllProducts = async () => {
    const response = await axios.get("http://localhost:8000/api/v1/products")
    return response.data
}

const getProductById = async (data) => {
    console.log(data)
    const response = await axios.get(`http://localhost:8000/api/v1/products/64fb084629656527dfb9213d`)
    return response.data
}

const addNewProduct = async (data) => {
    const response = await axios.post("http://localhost:8000/api/v1/products/create",data)
    return response.data;
}

const productsCRUDServices = {
    addNewProduct,
    getAllProducts,
    getProductById
}

export default productsCRUDServices;