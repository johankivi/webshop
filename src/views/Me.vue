<template>
    <main id="me" class="grid-container">
        <article class="col-3">
        <h1>{{ me.name}}</h1>
        <h2>{{ me.email}}</h2>
        <p>{{me.role}}</p>
        </article>
        <article class="col-3">
            {{ me.adress }}
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