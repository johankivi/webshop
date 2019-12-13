<template>
<section id="overlay">
<aside class="background" @click="toggleOverlay">

</aside>
<article class="single-product">
    <section class="product-img">
        <img :src="require(`@/assets/${product.imgFile}`)" :alt="product.title">
    </section>
    <section class="product-info">
        <h1>{{ product.title}}</h1>
        <h2>{{ product.shortDesc}}</h2>
        <p>{{ product.longDesc}}</p>
        <h3 class="price">{{ product.price }} sek</h3>
        <a href="#" class="btn">Take my money</a>
    </section>
</article>

</section>
</template>
<script>
export default {
    name: 'ProductView',
    computed: {
        product(){
            return this.$store.state.overlay.product;
        }
    },
    methods: {
        toggleOverlay(){
            this.$store.commit('toggleOverlay');
        }
    }
}
</script>
<style lang="scss">
  @import '../scss/variables';

#overlay {
    position: fixed;
    width: 100vw;
    height: 100vh;
    display: flex;
    z-index: 333;

    aside.background {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, .9);
        z-index: 666;
    }

    article.single-product {
        display: flex;
        max-width: 800px;
        width: 100%;
        margin: auto;
        background: white;
        z-index: 999;
        
        section {
            flex: 1;

            &.product-img {
                background: $lightGrey;
                display: flex;
                align-items: flex-end;
                justify-content: center;

                img {
                    width: 90%;
                    margin: 3rem 0 0 0;
                }
            }

            &.product-info {
                padding: 2rem;

                h1 {
                    font-size: 2rem;
                    margin: 0;
                }

                h2 {
                    margin: 0;
                    font-weight: 600;
                    color: $middleGrey;
                    font-size: 1.4rem;
                }

                p {
                    color: rgba(0, 0, 0, .6);
                    line-height: 150%;
                }

                .price {
                    font-size: 1.6rem;
                }
            }

        }

    }

}
</style>
