import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';
import api from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    auth: {
      loggedIn: false,
      error: false,
      token: null,
      user: {
        role: 'anonymous'
      }
    },
    items: [],
    overlay: { 
      active: false,
      product: null
    },
    orderHistory: [],
    cart: []
  },
  mutations: {
    toggleOverlay(state){
      state.overlay.active = !state.overlay.active
    },
    setActiveProduct(state, product){
      state.overlay.product = product;
    },
    addToCart(state, item){
      state.cart.push(item);
    },
    removeFromCart(state, index){
      state.cart.splice(index,1);
    },
    setProducts(state, products){
      state.items = products;
    },
    addProduct(state, product){
      state.items.push(product)
      state.items = state.items.sort((a,b) => a.title > b.title)
    },
    updateProduct(state, updatedProduct){
      state.items = state.items.map(
        product => product._id == updatedProduct._id ? updatedProduct : product
      )
    },
    removeProduct(state, productId){
      state.items = state.items.filter(
        product => product._id != productId
      )
    },
    setOrderHistory(state, orders){
      state.orderHistory = orders
    },
    auth(state, body){ 
      state.auth.user = body.user;
      state.auth.loggedIn = true;

      api.setAuthHeader(body.token)

      const user = body.user;
      const token = body.token

      // Set session
      sessionStorage.setItem('sinus', JSON.stringify({user,token}));      
    
    },
    login(state){
      state.auth.loggedIn = true;
      state.auth.error = false;

    },
    failLogin(state){
      state.auth.login = false
      state.auth.error = true
      api.clearAuthHeader();
    },
    logout(state){
      state.auth.loggedIn = false;
      state.auth.error = false
      api.clearAuthHeader()
      sessionStorage.removeItem('sinus');
    }
  },
  actions: {
    checkAuth({commit}){
      if(sessionStorage.getItem('sinus')){
        const persistedData = JSON.parse(sessionStorage.getItem('sinus'))
        commit('auth', persistedData)
        console.log('User Authorized')
      } else {
        commit('logout')
        console.log('User Not Authorized')
      }
    },

    showSingleProduct({commit}, item){
      commit('toggleOverlay')
      commit('setActiveProduct', item);
    },

    submitOrder(_, order){
      order.items = order.items.map(item => item._id)
      api.post('/orders', order)
      .then(response => {
        console.log(response)
        router.push('/thankyou');
      })
      .catch(console.log)
    },

    createProduct({commit}, newProduct){
      api.post('/products', newProduct)
      .then(response => {
        console.log(response)
        commit('addProduct', response.data.product)
      })
      .catch(console.log)
    },

    readProducts({commit,state}){
      state.loading = true;
      api.get('/products')
      .then(response => {
        console.log(response)
        state.loading = false;
        commit('setProducts', response.data)
      })  
      .catch(console.log)
    },

    updateProduct({commit}, updatedProduct){
      api.patch(`/products/${updatedProduct._id}`, updatedProduct)
      .then(response => {
        console.log(response)
        commit('updateProduct', updatedProduct)
      })
      .catch(console.log)
    },

    removeProduct({commit}, productToBeRemoved){
      api.delete(`/products/${productToBeRemoved._id}`)
      .then(response => {
        console.log(response)
        commit('removeProduct', productToBeRemoved._id)
      })
      .catch(console.log)
    },

    register({commit}, newUser){
      api.post('/register', newUser)
      .then(response => {
        console.log(response)
        commit('auth', response.data)
        commit('login')
      })
      .catch(console.log)
    },

    login({commit}, credentials){
      api.post('/auth', credentials)
      .then(response => {
        console.log(response)
        commit('auth', response.data)
      })
      .catch(error => {
        console.log(error)
        commit('failLogin')
      })
    },

    logout({commit}){
      commit('logout')
    },

    readOrders({commit}){
      api.get('/orders')
      .then(response => {
        console.log(response)
        commit('setOrderHistory', response.data)
      })
      .catch(console.log)
    }
  },
  getters: {
    total(state){
      let total = 0;
      state.cart.forEach(item => {
        total += item.price;
      })
      return total;

    }
  }
})