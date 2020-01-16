<template>
    <main id="thankyou" class="grid-container">
        <section class="hero col-6">
            <h1>Thank You!</h1>
        </section>
        <section class="col-6">
            <h1>Your order is beeing processed, go out and skate while you wait</h1>
            <p>Vans Calfornia Daze rock and roll chicken wing pogo transfer. Powerslide pivot slam Sidewalk Surfer durometer. Deck full-cab gap Old Ghosts ho-ho. Invert melancholy feeble rocket air. Hanger rock and roll g-turn ledge. 50-50 Kevin Harris boardslide street Mark Gonzales. Air pool hang-up fakie out Randy Ruiz. Steps nose bump powerslide axle set. Future Primitive Japan air snake steps camel back. Face plant crailtap rail slide half-cab. Rail regular footed flypaper drop in. Casper slide speed wobbles indy grab ollie hole. </p>
            <a href="#" class="btn" @click="$router.push('/')">Coolio!</a>
        </section>
    </main>
</template>
<script>
export default {
    name: 'Thankyou',
    data(){
        return {

        }
    }
}
</script>
<style lang="scss">
#thankyou {
    padding: 0 0 3rem 0;

    .hero {
        background: url('../assets/skate-hero-1.jpg');
        background-size: cover;
        background-position: center;
        height: 30rem;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 2rem rgba(0,0,0,.2);

        h1 {
            font-size: 3rem;
            color: white;
            text-shadow: 0 0 1rem rgba(0,0,0,1);
        }
    }
}
</style>