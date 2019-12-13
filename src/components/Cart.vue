<template>
    <aside class="cart" @click="showModal = !showModal">
        <div class="badge" v-if="cart.length > 0">{{ cart.length }}</div>
        <img src="@/assets/icon-bag-white.svg" alt="cart">
        <section v-if="showModal" class="cart-modal">
            <article class="cart-item" v-for="item in cart" :key="item.serial">
                {{item.title}}
            </article>
        </section>
    </aside>
</template>
<script>
export default {
    name: 'cart',
    data(){
        return {
            showModal: true
        }
    },
    computed: {
        cart(){
            return this.$store.state.cart;
        },
        total(){
            return this.$store.getters.total;
        }
    }
}
</script>
<style lang="scss">
  @import '../scss/variables';

    .cart {
        background: $red;
        width: 1.8rem;
        height: 1.8rem;
        padding: .25rem;
        margin-left: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 999rem;
        position: relative;

        .badge {
            width: 1.4rem;
            height: 1.4rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background: white;
            font-size: .7rem;
            font-weight: 700;
            border-radius: 999rem;
            position: absolute;
            transform: translate3d(1rem, -1rem, 0);
            box-shadow: 0 0 1rem rgba(0,0,0,.2);
        }

        img {
            width: 50%;
            opacity: .8;
            transform: translateY(-1px);
        }

        .cart-modal {
            width: 20rem;
            height: 40rem;
            background: white;
            position: absolute;
            top: 3.25rem;
            z-index: 222;
            box-shadow: 0 0 3rem rgba(0,0,0,.2);

            &:after {
                content: '';
                position: absolute;
                top: 0;
                left: 50%;
                width: 0;
                height: 0;
                border: 0.625em solid transparent;
                border-bottom-color: white;
                border-top: 0;
                margin-left: -0.625em;
                margin-top: -0.625em;
            }
        }
    }

</style>