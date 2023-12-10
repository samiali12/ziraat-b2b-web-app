import axios from "axios"


const getSearchProducts = (query) => {
    const response = axios.get(`http://localhost:8000/api/v1/search?query=${query}`)
    return response;
}

const searchProducts = {
    getSearchProducts
}

export default searchProducts;