import Vue from 'vue'
import Vuex from 'vuex'
import Items from './storedata';

Vue.use(Vuex)

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
      state.auth.loggedIn = true;
      state.auth.user = user;
    }
  },
  actions: {
    showSingleProduct(ctx, item){
      console.log(item);
      ctx.commit('toggleOverlay')
      ctx.commit('setActiveProduct', item);
    },
    submitOrder(ctx, order){

      // POST to API
      console.log(order)
    },
    createProduct(ctx, newProduct){
      console.log(newProduct)
    },
    readProducts(ctx){
      
      // Call API
      let items = Items;
      ctx.commit('setProducts', items)

    },
    updateProduct(ctx, updatedProduct){
      console.log(updatedProduct)
    },
    auth(ctx){

      let user = {
                  name: 'Johan Kivi',
                  role: 'admin', // customer
                  email: 'johan.kivi@zocom.se',
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
      return { total: total, moms: ( Math.round(total * 0.25)) };

    }
  }
})