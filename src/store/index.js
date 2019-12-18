import Vue from 'vue'
import Vuex from 'vuex'
// import Items from './storedata';

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
      //state.auth.loggedIn = true;
      state.auth.user = user;
    }
  },
  actions: {
    showSingleProduct(ctx, item){
      ctx.commit('toggleOverlay')
      ctx.commit('setActiveProduct', item);
    },
    async submitOrder(ctx, order){
      order.items = order.items.map(item => item._id)
      
      let response = await fetch('/api/orders', {
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(order)}
      )
      let body = await response.json()
      console.log(body)
      
    },
    createProduct(ctx, newProduct){
      console.log(newProduct)
    },
    async readProducts(ctx){
      let response = await fetch('/api/products')
      let items = await response.json()
      ctx.commit('setProducts', items)

    },
    updateProduct(ctx, updatedProduct){
      console.log(updatedProduct)
    },
    register(ctx, newUser){

      console.log(newUser);
    
    },
    auth(ctx, credentials){

      console.log(credentials);
      
      let user = {
                  uuid: 'af1b238f-3dc7-4daf-bbf7-06b913e0a273',
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
      return { total: total, moms: ( Math.round(total * 0.25)) };

    }
  }
})