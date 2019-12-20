<template>
    <main id="me" class="grid-container">
        <h1>Me</h1>
        <p>{{me}}</p>
        <p>{{orderHistory}}</p>
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