<template>
  <main id="admin" class="grid-container">
     <transition name="drop">
        <ProductForm :product="selectedProduct" v-if="showModal" /> 
    </transition>

      <header class="col-6">
          <a href="#" class="btn outline" @click.prevent="addProduct">+ Add new Item</a>
      </header>
      <article class="product-row col-6" v-for="(product, index) in products" :key="index">
        <figure>
          <img :src="require(`@/assets/${product.imgFile}`)" :alt="product.title">
        </figure>
        <section class="info">
          <h1>{{product.title }}</h1>
          <h2>{{product.shortDesc}}</h2>
        </section>
        <aside class="edit" @click="editProduct(index)">
            <a href="#">
              <img src="../assets/icon-edit-white.svg" alt="edit">
            </a>
        </aside>
      </article>
  </main>
</template>
<script>
import ProductForm from '@/components/ProductForm';

export default {
  name: 'Admin',
  components: {
    ProductForm
  },
  data(){
    return {
      showModal: false,
      edit: false,
      selectedProduct: Object
    }
  },
  methods: {
    editProduct(index){
        this.selectedProduct = this.products[index];
        this.edit = true;
        this.showModal = true;

    },
    addProduct(){
        this.selectedProduct = {
        imgFile: 'skateboard-generic.png',
        title: '',
        serial: Date.now(),
        price: 0,
        shortDesc: '',
        longDesc: ''
      }

      this.showModal = true;
    }
  },
  computed: {
    products(){
      return this.$store.state.items;
    },
    auth(){
      return this.$store.state.auth.user;
    }
  },
  mounted(){
    if(this.$store.state.items.length == 0){
      this.$store.dispatch('readProducts')
    }
  }
}
</script>
<style lang="scss">
@import '../scss/variables';

#admin {

  header {
    text-align: right;

    .outline {
      background: none;
      border: 1px solid $middleGrey;
      color: $middleGrey;

      &:hover {
        border: 1px solid $darkGrey;
        color: $darkGrey;
      }

      &:active {
        background: $darkGrey;
        color: #eee;
      }

    }
  }

  .product-row {
    display: grid;
    grid-template-columns: 6rem 1fr 6rem;
    grid-auto-rows: 2rem;
    gap: 1rem;
    padding: 0;
    background: white;
    box-shadow: 0 0 2rem rgba(0,0,0,.2);

    figure {
      grid-row: auto / span 2;
      margin: 0;
      padding: 0 1rem;
      box-sizing: border-box;
      background: #eee;
      height: 100%;
      display: flex;
      align-items: flex-end;

      img {
        margin: -1rem 0 0 0;
        width: 100%;
      }
    }

    h1 {
      grid-column: auto / span 1;
      margin: .5rem 0;
      padding: 0;
      font-size: 1.4rem;
    }

    h2 {
      grid-column: 2 / 1;
      font-size: 1rem;
      font-weight: 600;
      color: $middleGrey;
      margin: 0;
    }

    .edit {
      grid-column: auto / span 1;
      grid-row: auto / span 2;  
      display: flex;
      justify-content: center;
      align-items: center;

      a {
        background: $middleGrey;
        width: 1.8rem;
        height: 1.8rem;
        padding: .25rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 999rem;
        
        &:hover {
          background: $darkGrey;
        }

        img {
          width: 50%;
        }
      }

    }

  }


}

</style>
