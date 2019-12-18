<template>
  <section id="overlay">
    <aside class="background" @click="toggleOverlay"></aside>
      <form>
        <h1 class="col-4 row-1"><span v-if="$parent.edit">Edit</span><span v-else >Add</span> Product</h1>
        <label for="image" class="col-4">
          Product image URL
          <input type="text" v-model="activeProduct.imgFile">
        </label>
        <label for="product-name" class="col-4">
          Product Name
          <input type="text" v-model="activeProduct.title">
        </label>
        <label for="" class="col-1">
          Serial Number
          <input type="text" v-model="activeProduct.serial">
        </label>
        <label for="" class="col-1">
          Price
          <input type="number" v-model="activeProduct.price">
        </label>
        <label for="" class="col-2">
          Short Description
          <input type="text" v-model="activeProduct.shortDesc">
        </label>
        <label for="" class="col-4 row-2">
          Long Description
          <textarea rows="3" v-model="activeProduct.longDesc"></textarea>
        </label>
        <footer class="col-4">
          <a href="#" class="btn" @click.prevent="submit">Submit</a>
        </footer>
      </form>
  </section>
</template>
<script>
export default {
    name: 'ProductForm',
    props: ['product'],
    data(){
    return {
      activeProduct: Object
    }
  },
  methods: {
    submit(){

        if(!this.$parent.edit){
          // New product
          this.$store.dispatch('createProduct', this.product)

        } else {
          // Edited Product
          this.$store.dispatch('updateProduct', this.product)
        }

        this.toggleOverlay();
    },
    toggleOverlay(){
      this.$parent.showModal = false;

      // reset edit mode
      this.$parent.edit = false;
    }
  },
  beforeMount(){
    this.activeProduct = Object.assign(this.product);
  }
}
</script>
<style lang="scss">
@import '../scss/variables';

#overlay {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    z-index: 333;
    padding: 1rem;
    box-sizing: border-box;

    aside.background {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, .9);
        z-index: 666;
    }

    form {
    margin: auto;
    padding: 1rem;
    max-width: 40rem;
    background: white;
    z-index: 999;
  }

}

</style>