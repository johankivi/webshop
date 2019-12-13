import Vue from 'vue'
import Vuex from 'vuex'
import Items from './storedata';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
    }
  },
  actions: {
    showSingleProduct(ctx, item){
      console.log(item);
      ctx.commit('toggleOverlay')
      ctx.commit('setActiveProduct', item);
    }
  },
  modules: {
  }
})
