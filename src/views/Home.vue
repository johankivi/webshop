<template>
  <main id="home" class="grid-container">
    <p class="col-6" v-if="loading">Loading products...</p>
    <Product v-for="product in products" :key="product.serial" :item="product"/>
  </main>
</template>

<script>
import Product from '@/components/Product';

export default {
  name: 'home',
  components: {
    Product
  },
  computed: {
    products(){
      return this.$store.state.items;
    },
    loading(){
      return this.$store.state.loading;
    }
  },
  beforeMount(){
    this.$store.dispatch('readProducts');
  }
}
</script>
<style lang="scss">

#home {
  margin-bottom: 3rem;
  grid-auto-rows: minmax(28rem, auto);
}

</style>
