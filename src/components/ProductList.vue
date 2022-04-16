<template>
    <h1>Product List</h1>
  <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif" />
  <div v-else>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price }} -{{product.inventory}}
        <button 
        :disabled="!getProductInStock(product)"
        @click="addProductToCart(product)"
        >Add Product</button>
      </li>
    </ul>
  </div>
</template>

<script>

import {mapGetters, mapState, mapActions} from 'vuex'
export default {
  name: "ProductList",

  data() {
    return {
      loading: false,
    };
  },
  computed: {

    ...mapState('products',{
      products: state => state.products
    }),
    ...mapGetters('products',{
      getProductInStock: 'getProductInStock'
    }),
    // products() {
    //   return this.$store.state.products;
    // },
    //  getProductInStock(){
    //    return this.$store.getters.getProductInStock
    //  }
  },

  methods:{

        ...mapActions({
      addProductToCart: 'cart/addProductToCart',
      fetchProducts:'products/fetchProducts'
    }),

    // addProductToCart(product){
    //   this.$store.dispatch('addProductToCart', product)
    // }
  },

  created() {
    this.loading = true;
    //this.$store.dispatch("fetchProducts").then(() => (this.loading = false));
    this.fetchProducts().then(() => (this.loading = false));
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
