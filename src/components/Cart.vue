<template>
    <aside class="cart" @click="showModal = !showModal" v-click-outside="close">
        <div class="badge" :class="{ animate: animate }" v-if="cart.length > 0">{{ cart.length }}</div>
        <img src="@/assets/icon-bag-white.svg" alt="cart">
        <section v-if="showModal" class="cart-modal">
            <p v-if="!cart.length">No items in cart.</p>
            <article class="cart-item" v-for="(item, index) in cart" :key="index" @click="removeFromCart(index)">
                <figure class="thumbnail">
                    <img :src="require(`@/assets/${item.imgFile}`)" :alt="item.title">
                </figure>
                <section class="info">
                    <h1>{{item.title}}</h1>
                    <h2>{{item.shortDesc}}</h2>
                </section>
                <p class="price">{{item.price}} kr</p>
            </article>
            <footer class="total" v-if="cart.length">
                <h1>Total</h1><h1>{{ total }} kr</h1>
            </footer>
            <a href="#" v-if="cart.length" class="btn large" @click="$router.push('/pay')">Take my Money!</a>
        </section>
    </aside>
</template>
<script>
import ClickOutside from 'vue-click-outside';

export default {
    name: 'cart',
    data(){
        return {
            showModal: false,
            animate: false
        }
    },
    methods: {
        removeFromCart(index){
            this.$store.commit('removeFromCart', index);
        },
        close(){
            this.showModal = false
        }
    },
    computed: {
        cart(){
            return this.$store.state.cart;
        },
        total(){
            return this.$store.getters.total;
        }
    },
    watch: {
        cart(){
            this.animate = true;

            setTimeout(() => {
                this.animate = false;
            }, 400)
        }
    },
    directives:{ClickOutside}
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

            &.animate {
                animation: drop .5s ease forwards;

                @keyframes drop {
                    from { transform: translate3d(1rem, -1rem, 0) scale(2); opacity: 0; }
                      to { transform: translate3d(1rem, -1rem, 0) scale(1); opacity: 1; }
                }
            }
        }

        img {
            width: 50%;
            opacity: .8;
            transform: translateY(-1px);
        }

        .cart-modal {
            width: 18rem;
            padding: 1rem;
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

            > p {
                text-align: center;
            }

            .cart-item {
                display: grid;
                margin: 0 0 .5rem 0;
                padding-bottom: .5rem; 
                grid-template-columns: 3rem 1.5fr 1fr;
                grid-auto-rows: 1.5rem;
                gap: 0 .5rem;
                border-bottom: 1px solid rgba(0,0,0,.05);

                &:hover {
                    opacity: .8;
                    cursor: pointer;
                    background: $lightRed;
                }

                .quantity {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    grid-row: auto / span 2;

                    span {
                        display: flex;
                        width: 1.8rem;
                        height: 1.8rem;
                        background: $darkGrey;
                        color: #eee;
                        justify-content: center;
                        align-items: center;
                        border-radius: 999rem;
                        font-size: .8rem;
                    }
                }

                h1 {
                    margin: 0;
                    padding: 0;
                    font-size: 1.2rem;
                    grid-column: auto / span 1;
                    display: flex;
                    align-items: center;
                }

                .price {
                    margin: 0;
                    padding: 0;
                    font-size: 1.1rem;
                    grid-column: auto / span 1;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                }

                h2 {
                    margin: 0;
                    padding: 0;
                    font-size: .9rem;
                    font-weight: 600;
                    grid-column: auto / span 1;
                    display: flex;
                    align-items: flex-end;
                }

                .serial {
                    margin: 0;
                    padding: 0;
                    font-size: .6rem;
                    font-weight: 400;
                    color: rgba(0,0,0,.5);
                    font-style: italic;
                    grid-column: auto / span 1;
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-end;
                }

                figure {
                    margin: 0;
                    background: $lightGrey;
                    grid-row: auto / span 2;
                    grid-column: auto / span 1;
                    display: flex;
                    justify-content: center;
                    align-items: flex-end;

                    img {
                        width: 80%;
                    }
                }
            }

            .total {
                display: flex;
                border-top: 2px solid $darkGrey;
                padding: .25rem 0;

                h1 {
                    flex: 1;
                    margin: 0;

                    &:last-child {
                        text-align: right;
                    }

                }

            }

        }
    }

</style>