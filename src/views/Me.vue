<template>
    <main id="me" class="grid-container">
        <h1 class="col-6">{{ me.name}}</h1>
        <article class="col-3">
        <h3>{{ me.email}}</h3>
        <p>Role: {{me.role}}</p>
        </article>
        <article class="col-3">
            <h3>{{ me.adress.street }}</h3>
            <p>{{ me.adress.zip }}, {{ me.adress.city }}</p>
        </article>
        <h2 class="col-6">Order History</h2>
        <section class="order-history col-6">
            <article class="order-item" v-for="item in orderHistory" :key="item.orderNumber">
               <p>{{ item._id }}</p>
               <p>Items count: {{ item.items.length }}</p>
               <p>{{ item.orderValue}}</p>
          </article>
        </section>

    </main>
</template>
<script>
export default {
    name: 'Me',
    computed: {
        me(){
            return this.$store.state.auth.user;
        },
        orderHistory(){
            return this.$store.state.orderHistory
        }
    },
    beforeMount(){
        this.$store.dispatch('readOrders')
    }
}
</script>
<style lang="scss">
.order-history {

    .order-item {
        display: flex;
        border-bottom: 1px solid rgba($color: #000000, $alpha: .1);

        &:hover {
            background: rgba($color: #000000, $alpha: .025);
        }

        p {
            flex: 1;
            padding: .25rem;

            &:first-child {
                font-weight: 600;
            }
        }
    }
 }

</style>