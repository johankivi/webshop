<template>
    <main id="me" class="grid-container">
        <h1>Me</h1>
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
        }
    }
}
</script>
<style lang="scss">

</style>