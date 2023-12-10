import axios from "axios"



const getAllProducts = async ( ) => {
    
    const response = await axios.get(`http://localhost:8000/api/v1/products`)
   
    return response.data
}

const getProductByCategory = async (categoryName) => {
    console.log("Category ===> ", categoryName)
    const response = await axios.get(`http://localhost:8000/api/v1/products/category/${categoryName}`)
   
    return response.data
}

const getProductById = async (data) => {
    const id = data
    const response = await axios.get(`http://localhost:8000/api/v1/products/${id}`)
    return response.data
}

const addNewProduct = async (data) => {
    const response = await axios.post("http://localhost:8000/api/v1/products/create",data)
    return response.data;
}

const productsCRUDServices = {
    addNewProduct,
    getAllProducts,
    getProductByCategory,
    getProductById
}

export default productsCRUDServices;