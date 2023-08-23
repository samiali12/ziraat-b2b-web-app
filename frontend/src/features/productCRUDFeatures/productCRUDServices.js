import axios from "axios"



const getAllProducts = async () => {
    const response = await axios.get("http://localhost:8000/api/v1/products")
    return response.data
}



const productsCRUDServices = {
    getAllProducts,
}

export default productsCRUDServices;