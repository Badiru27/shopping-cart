import { createStore } from 'vuex'
import cart from './modules/cart'
import products from './modules/product'

export default createStore({
  modules: {
    cart,
    products
  },

  state: {
    //data
  },

  getters: {
    //computed
  },
  
  actions: {  
  },
  
    mutations: {
    },


})
