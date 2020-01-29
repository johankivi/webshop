import axios from 'axios'

const api = axios.create({baseURL:'/api'})

api.setAuthHeader = function(token){
    this.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

api.clearAuthHeader = function(){
    delete this.defaults.headers.common['Authorization']
}

export default api