import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
// import Items from './storedata';

Vue.use(Vuex)

const api = axios.create({baseURL:'/api'});

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
      state.auth.loggedIn = true;
      api.defaults.headers.common['Authorization'] = `Bearer ${body.token}`

      let user = body.user;
      user.token = body.token;

      // Set session
      sessionStorage.setItem('sinus', JSON.stringify(user));      
    
    },
    login(state){
      state.auth.loggedIn = true;
      state.auth.error = false;
    },
    failLogin(state){
      state.auth.login = false
      state.auth.error = true
      delete api.defaults.headers.common['Authorization']
    },
    logout(state){
      state.auth.loggedIn = false;
      state.auth.error = false
      delete api.defaults.headers.common['Authorization']
      sessionStorage.removeItem('sinus');
    }
  },
  actions: {
    checkAuth(ctx){
      if(sessionStorage.getItem('sinus')){
        ctx.state.auth.user = JSON.parse(sessionStorage.getItem('sinus'));
        api.defaults.headers.common['Authorization'] = `Bearer ${ctx.state.auth.user.token}`;
        ctx.state.auth.loggedIn = true;
        console.log('User Authorized')
      } else {
        ctx.state.auth.loggedIn = false;
        ctx.state.auth.user = null;
        console.log('User Not Authorized')
      }
    },
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

        let resp = await api.post(newProduct);
  
        // Handle resp
        console.log(resp);
      } catch(err) {
        // Handle err
        console.error(err);
      }

    },
    async readProducts(ctx){
      ctx.state.loading = true;
      let response = await fetch('/api/products')
      let items = await response.json()
      ctx.state.loading = false;
      ctx.commit('setProducts', items)

    },
    async updateProduct(ctx, updatedProduct){
      console.log('updating product');
      try {
      
        let resp = await api.patch(`/products/${updatedProduct._id}`, updatedProduct);
        // Handle resp
        console.log(resp);

      } catch(err) {
        // Handle err
        console.error(err);
      }
    },
    async removeProduct(ctx, productToBeRemoved){

      try {

        let resp = await api.delete(`/products/${productToBeRemoved._id}`, productToBeRemoved._id)
        // Handle resp
        console.log(resp);

      } catch(err) {
        // Handle err
        console.error(err);
      }
    },
    async register({commit}, newUser){

      try {
        let resp = await api.post('/register', newUser);
        if(resp.status == 200){
          commit('auth', resp.data)
          commit('login')
        }
      } catch(err) {
        // Handle err
        console.error(err);
      }
    
    },
    async login({commit}, credentials){

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
        }else{
          throw new Error()
        }
      })
      .catch(error => {
        commit('failLogin')
      })
    },

    async logout({commit}){
      commit('logout')
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