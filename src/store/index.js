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
