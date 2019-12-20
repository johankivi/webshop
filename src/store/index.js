import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
// import Items from './storedata';

Vue.use(Vuex)

const api = axios.create({baseURL:'/api'})

export default new Vuex.Store({
  state: {
    auth: {
      loggedIn: false,
      error: false,
      token: null,
      user: {
        role: 'anonymous'
      }
    },
    items: null,
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
    setOrderHistory(state, orders){
      state.orderHistory = orders
    },
    auth(state, body){ 
      state.auth.user = body.user;
      api.defaults.headers.common['Authorization'] = `Bearer ${body.token}`
    },
    login(state){
      state.auth.loggedIn = true;
      state.auth.error = false
    },
    failLogin(state){
      state.auth.login = false
      state.auth.error = true
      delete api.defaults.headers.common['Authorization']
    },
    logout(state){
      state.auth.loggedIn = false;
    }
  },
  actions: {
    showSingleProduct(ctx, item){
      ctx.commit('toggleOverlay')
      ctx.commit('setActiveProduct', item);
    },
    async submitOrder(ctx, order){
      order.items = order.items.map(item => item._id)
      
      let response = await api.post('/orders', order)
  
      console.log(response)
      
    },
    async createProduct(ctx, newProduct){
      try {
        let resp = await fetch('/api/products', {
          method:'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${ctx.state.auth.token}`            
          },
          body: JSON.stringify(newProduct)
        });
        // Handle resp
        console.log(resp);
      } catch(err) {
        // Handle err
        console.error(err);
      }

    },
    async readProducts(ctx){
      let response = await fetch('/api/products')
      let items = await response.json()
      ctx.commit('setProducts', items)

    },
    async updateProduct(ctx, updatedProduct){
      try {
        let resp = await api.patch(`/products/${updatedProduct._id}`, updatedProduct);
        // Handle resp
        console.log(resp);
      } catch(err) {
        // Handle err
        console.error(err);
      }
    },
    async register(ctx, newUser){
      try {
        let resp = await fetch('/users', {
          method:'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            // Add Authorization Header here
          },
          body: JSON.stringify(newUser)
        });
        // Handle resp
        console.log(resp);
      } catch(err) {
        // Handle err
        console.error(err);
      }
    
    },
    async auth({commit}, credentials){

      fetch('/api/auth', {
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
      .then(async response => {
        let body = await response.json()
        if(response.status == 200){
          commit('auth', body )
          commit('login')
        }else{
          throw new Error()
        }
      })
      .catch(error => {
        commit('failLogin')
      })
    },

    async readOrders({commit}){
      const response = await api.get('/orders')
      commit('setOrderHistory', response.data)
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