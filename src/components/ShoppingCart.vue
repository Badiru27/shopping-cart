<template>
  <div>
      <h1>Shopping cart</h1>
      <ul>
          <li v-for="product in products" :key="product.id">
              {{product.title}} -- {{product.price}} -- {{product.quantity}}
          </li>
          <li>{{total}}</li>
      </ul>
      <button @click="checkout()">checkout</button>
      <p>{{checkoutStatus}}</p>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapState} from 'vuex'
export default {
    name: "ShoppingCart",
    computed:{
        ...mapState('cart',{
           checkoutStatus: state=> state.checkoutStatus 
        }),
        ...mapGetters('cart', {
            products: 'getCartProducts',
            total: 'cartTotal'
        }),
        
        // products(){
        //   return  this.$store.getters.getCartProducts
        // },

        // total(){
        //     return this.$store.getters.cartTotal
        // },
        
    },

    methods:{
        ...mapActions('cart',{
          checkout:'checkout'  
        })
        // checkout(){
        //     this.$store.dispatch('checkout')
        // }
    }
}
</script>

<style>

</style>