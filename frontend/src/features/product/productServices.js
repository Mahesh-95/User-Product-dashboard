import axios from 'axios'

const API_URL = '/api/product/'

// Add product
const addProduct = async (productData, token) => {
  const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
}
  const response = await axios.post(API_URL, productData, config)

  return response.data
}

//Get product
const getProduct = async (token) => {
  const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
}
  
    const response = await axios.get(API_URL, config)
  
    return response.data
  }

//Get Product Details 
const getProductById = async (id, token) => {

  const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
}
  
    const response = await axios.get(API_URL+id, config)
  
    return response.data
  }

//Edit Product
const editProductById = async (productData, token) => {
  const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
}
    const response = await axios.put(API_URL+productData._id, productData, config)
  
    return response.data
  }

//Delete Product
const deleteProductById = async (id, token) => {
  const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
}
  
    const response = await axios.delete(API_URL+id, config)
  
    return response.data
  }

const productService = {
    addProduct,
    getProduct,
    getProductById,
    editProductById,
    deleteProductById
  }
  
  export default productService