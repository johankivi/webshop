<template>
<article class="product col-2">
    <aside class="buy" @click="addToCart(item)">
        <img src="@/assets/icon-bag-black.svg" alt="Buy">
    </aside>
    <aside class="price">
    {{item.price}} <span class="currency">Sek</span>
    </aside>
    <h1>{{ item.title }}</h1>
    <h2>{{ item.shortDesc }}</h2>
    <figure @click="showOverlay(item)">
        <img :src="require(`@/assets/${item.imgFile}`)" :alt="item.title">
    </figure>
</article>
</template>
<script>
export default {
    name: 'product',
    props: ['item'],
    methods: {
        showOverlay(item){
            this.$store.dispatch('showSingleProduct', item);
        },
        addToCart(item){
            this.$store.commit('addToCart', item);
        }
    }
}
</script>
<style lang="scss">
  @import '../scss/variables';

.product {
    background: white;
    position: relative;
    padding: 1.5rem 1.5rem 0 1.5rem;
    box-shadow: 0 0 2rem rgba(0,0,0,.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all .2s ease;

    h1 {
        font-size: 2rem;
        margin: 0;
        align-self: flex-start;
    }

    h2 {
        font-size: 1.2rem;
        font-weight: 600;
        color: $middleGrey;
        align-self: flex-start;
        margin: 0;
    }

    figure {
        margin: auto 0 0 0;
        padding: 0;

        img {
            width: 100%;
            margin: 0 0 -5px 0;
            padding: 0;
        }

    }

    .buy {
        position: absolute;
        right: 2rem;
        top: 2rem;
        width: 2.4rem;
        height: 2.4rem;
        background: $lightGrey;
        z-index: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 999rem;

        img {
            width: 40%;
            opacity: .8;
        }

        &:hover {

            cursor: pointer;

            img {
                opacity: 1;
            }
        }

        &:active {
            background: $red;
            img {
                filter: invert(1);
            }
        }
    }

    .price {
        position: absolute;
        left: 1.5rem;
        bottom: 1.5rem;
        background: #222;
        color: white;
        border-radius: $round;
        font-weight: 800;
        font-size: 1.4rem;
        padding: .5rem 1rem;
        z-index: 2;
        box-shadow: 0 0 2rem rgba(0,0,0,.2);
    }


    &:hover {
        filter: brightness(.96);
    }

}



</style>