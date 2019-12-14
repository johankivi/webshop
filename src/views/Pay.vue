<template>
    <main id="pay" class="grid-container wide">
        <h1 class="col-6">Pay</h1>
        <h2 class="col-3">Your order</h2>
        <h2 class="col-3">Your Details</h2>
        <section class="col-3 order">
           
            <article class="order-item" v-for="(item, index) in cart" :key="index">
                <figure class="thumbnail">
                    <img :src="require(`@/assets/${item.imgFile}`)" :alt="item.title">
                </figure>
                <h1>{{item.title}}</h1>
                <p class="price">{{item.price}} kr</p>
                <h2>{{item.shortDesc}}</h2>
                <p class="serial">{{item.serial}}</p>
            </article>
             <footer class="total">
                <h1>Total</h1><h1>{{total.total}} kr</h1>
            </footer>
        </section>
        <section class="col-3 info">
            <label for="name" class="col-2">
                Your name
                <input type="text" name="name" v-model="order.customer.name">
            </label>
            <label for="street" class="col-2">
                Street
                <input type="text" v-model="order.customer.street">
            </label>
            <label for="zip" class="col-1">
                ZIP code
                <input type="number" v-model="order.customer.zip">
            </label>
            <label for="city" class="col-1">
                City
                <input type="text" v-model="order.customer.cuty">
            </label>
            <h2 class="col-2">Payment </h2>
            <label for="cardowner" class="col-2">
                Card Owner
                <input type="text" v-model="order.payment.cardOwner">
            </label>
            <label for="cardnumber" class="col-2">
                Card Number
                <input type="numbers" v-model="order.payment.cardNr">
            </label>
            <label for="cardvalid">
                Valid until
                <input type="text" v-model="order.payment.cardValidUntil">
            </label>
             <label for="cardcc">
                 CVV
                <input type="numbers" v-model="order.payment.cardCVV">
            </label>
            <footer class="col-2">
                <a href="#" class="btn">Submit Order</a>
            </footer>
        </section>
    </main>
</template>
<script>
export default {
    name: 'Pay',
    data(){
        return {
            order: {
                customer: {
                    name: '',
                    street: '',
                    zip: '',
                    city: ''
                },
                payment: {
                    cardOwner: '',
                    cardNr: '',
                    cardValidUntil: '',
                    cardCVV: ''
                },
                order: this.cart,
            }
        }
    },
    methods: {
        submitOrder(){
            this.$store.commit('submitOrder', this.order)
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

#pay {

    h1, h2 {
        margin: 0;
    }

    .order {
        background: white;
        padding: 1rem;
        box-shadow: 0 0 2rem rgba(0,0,0,.2);

        .order-item {
            display: grid;
            margin: 0 0 .5rem 0;
            padding-top: .5rem; 
            grid-template-columns: 4rem 1fr 1fr;
            grid-auto-rows: 2rem;
            gap: 0 .75rem;
            border-top: 1px solid rgba(0,0,0,.05);

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
    
    .info {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-auto-rows: 1.2rem;
        gap: 1.5rem 1rem;

        label {
            font-size: .8rem;
            color: $middleGrey;
            line-height: 150%;
            margin: 0;
            padding: 0;
            grid-row: auto / span 2;

            input {
                border: 1px solid $middleGrey;
                font-size: 1.2rem;
                appearance: none;
                background: none;
                padding: .5rem;
                width: 100%;
                box-sizing: border-box;
                border-radius: $round;

                &:focus {
                    color: black;
                    border-color: black;
                    outline: none;
                }
            }
        }

        footer {
            text-align: right;
        }

        &.col-1 {
            grid-column: auto / span 1;
        }

        &.col-2 {
            grid-column: auto / span 2;
        }

    }
}

</style>