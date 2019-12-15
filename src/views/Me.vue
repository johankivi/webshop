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
            name: '',
            email: '',
            adress: {
                street: '',
                zip: '',
                city: ''
            },
            payment: {
                cardOwner: '',
                cardNumber: '',
                validUntil: '',
                CVV: ''
            }        
        }
    }
}
</script>
<style lang="scss">

</style>