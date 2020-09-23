import axios from 'axios'

const api = axios.create({baseURL:'/api'})

export const setAuthHeader = function(token){
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const clearAuthHeader = function(){
    delete api.defaults.headers.common['Authorization']
}

export const fetchProducts =  async () => {
    console.log("GET /api/products")
    const response = await api.get('/products/')
    console.log("Response: ", response)
    return response.data
}

export const updateProduct = async updatedProduct => {
    console.log(`PATCH /api/products/${updatedProduct._id}`, " - Payload: ", updatedProduct)
    const response = await api.patch(`/products/${updatedProduct._id}`, updatedProduct)
    return response
}

export const createProduct = async newProduct => {
    console.log('POST /api/products', " - Payload: ", newProduct)
    const response = await api.post('/products', newProduct)
    console.log("Response: ", response)
    return response.data.product
}


export const removeProduct = async productToBeRemoved => {
    console.log(`DELETE /api/products/${productToBeRemoved._id}` )
    const response = await api.delete(`/products/${productToBeRemoved._id}`)
    console.log("Response", response);
    return response
}

export const createOrder = async newOrder => {
    console.log("POST /api/orders", " - Payload", newOrder)
    const response = await api.post('/orders', newOrder)
    console.log("Response: ", response)
    return response
}

export const fetchOrders = async () => {
    console.log(`GET /api/orders`)
    const response = await api.get('/orders')
    console.log("Response: ", response);
    return response.data
}

export const register = async newUser => {
    console.log('POST /api/register', " - Payload: ", newUser)
    const response = await api.post('/register', newUser)
    console.log("Response: ", response);
    return response.data
}

export const login = async credentials => {
    console.log('POST /api/auth', " - Payload: ", credentials)
    const response = await api.post('/auth', credentials)
    console.log("Response: ", response)
    return response.data
}