import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';
import * as API from '@/api'

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

      API.setAuthHeader(body.token)

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
      API.clearAuthHeader();
    },
    logout(state){
      state.auth.loggedIn = false;
      state.auth.error = false
      API.clearAuthHeader()
      state.cart = []
      state.orderHistory = []
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
      API.createOrder(order)
      .then( () => {      
        router.push('/thankyou');
      })
      .catch(console.log)
    },

    createProduct({commit}, newProduct){      
      API.createProduct(newProduct)
      .then( product => {
        commit('addProduct', product)
      })
      .catch(console.log)
    },

    readProducts({commit,state}){
      state.loading = true;
      API.fetchProducts()
      .then( products => {               
        state.loading = false;
        commit('setProducts', products)
      })  
      .catch(console.log)
    },

    updateProduct({commit}, updatedProduct){
      API.updateProduct(updatedProduct)
      .then( result => {
        commit('updateProduct', updatedProduct)
      })
      .catch(console.log)
    },

    removeProduct({commit}, productToBeRemoved){
      API.removeProduct(productToBeRemoved)
      .then( () => {
        commit('removeProduct', productToBeRemoved._id)
      })
      .catch(console.log)
    },

    register({commit}, newUser){      
      API.register(newUser)
      .then( user => {        
        commit('auth', user )
        commit('login')
      })
      .catch(console.log)
    },

    login({commit}, credentials){      
      API.login(credentials)
      .then(tokenData => {        
        commit('auth', tokenData)
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
      API.fetchOrders()
      .then(orders => {      
        commit('setOrderHistory', orders)
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