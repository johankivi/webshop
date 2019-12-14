<template>
  <main id="home" class="grid-container">
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
    }
  }
}
</script>
<style lang="scss">

#home {
  margin-bottom: 3rem;
  grid-auto-rows: minmax(28rem, auto);
}

</style>
