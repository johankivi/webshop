<template>
    <main id="me" class="grid-container">
        <article class="col-3">
        <h1>{{ me.name}}</h1>
        <h3>{{ me.email}}</h3>
        <p>Role: {{me.role}}</p>
        </article>
        <article class="col-3">
            <h3>{{ me.adress.street }}</h3>
            <p>{{ me.adress.zip }}, {{ me.adress.city }}</p>
        </article>
        <section class="order-history">
            <article class="order-item" v-for="item in orderHistory" :key="item.orderNumber">

    
            </article>
        </section>

    </main>
</template>
<script>
export default {
    name: 'Me',
    data(){
        return {

        }
    },
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

</style>