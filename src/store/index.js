import Vue from 'vue'
import Vuex from 'vuex'
import Items from './storedata';
import axios from 'axios';

Vue.use(Vuex)

const API_URL = 'http://localhost:3000';

export default new Vuex.Store({
  state: {
    auth: {
      loggedIn: false,
      user: null
    },
    items: null,
    overlay: { 
      active: false,
      product: null
    },
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
    auth(state, user){ 
      state.auth.user = user;
    },
    login(state){
      state.auth.loggedIn = true;
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

      try {

        let resp = await axios.post(`${API_URL}/orders`, order);
        console.log(resp);

      } catch(err) {
        console.error(err);
      }

    },
    async createProduct(ctx, newProduct){

      try {
        let resp = await axios.post(`${API_URL}/products`, newProduct);
        // Handle resp
        console.log(resp);
      } catch(err) {
        // Handle err
        console.error(err);
      }

    },
    async readProducts(ctx){
      
      // Call API
      let items = await Items;
      ctx.commit('setProducts', items)

    },
    async updateProduct(ctx, updatedProduct){
      try {
        let resp = await axios.patch(`${API_URL}/products/${updatedProduct._id}`, updatedProduct);
        // Handle resp
        console.log(resp);
      } catch(err) {
        // Handle err
        console.error(err);
      }
    },
    async register(ctx, newUser){
      try {
        let resp = await axios.post(`${API_URL}/users`, newUser);
        // Handle resp
        console.log(resp);
      } catch(err) {
        // Handle err
        console.error(err);
      }
    
    },
    async auth(ctx, credentials){

      console.log(credentials);
      
      let user = {
                  _id: 'af1b238f-3dc7-4daf-bbf7-06b913e0a273',
                  name: 'Johan Kivi',
                  role: 'admin', // customer
                  email: 'johan.kivi@zocom.se',
                  password: 'abc123',
                  adress: {
                      street: 'Tokitokvägen 3',
                      zip: '123 45',
                      city: 'Tokberga'
                  },
                  payment: {
                      cardOwner: 'Johan Kivi',
                      cardNumber: '1234 5678 9101 1121',
                      validUntil: '10 / 23',
                      CVV: '123'
                  },
                  orderHistory: []
                }
      
      ctx.commit('auth', user);
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