import Vue from 'vue'
import Vuex from 'vuex'
import Items from './storedata';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {
      loggedIn: false,
      role: 'anonymous',
      user: null
    },
    items: Items,
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
