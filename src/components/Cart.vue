<template>
    <aside class="cart">
        <img src="@/assets/icon-bag-white.svg" alt="cart">
    </aside>
</template>
<script>
export default {
    name: 'cart',
    data(){
        return {

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

        img {
            width: 50%;
            opacity: .8;
            transform: translateY(-1px);
        }

    }


</style>