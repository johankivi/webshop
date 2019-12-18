<template>
    <main id="register" class="grid-container">
        <section class="hero col-6">
            <h1>Join the rolling family!</h1>
        </section>
        <section class="col-3">
            <h1>Cowabunga</h1>
            <p class="ingress">Skate ipsum dolor sit amet, rip grip hip grab 540 pivot nose Tracker. Gnar bucket Skateboard Shuffle casper slide 180 boneless layback hardware nosebone.</p>

<p>Vans Calfornia Daze rock and roll chicken wing pogo transfer. Powerslide pivot slam Sidewalk Surfer durometer. Deck full-cab gap Old Ghosts ho-ho. Invert melancholy feeble rocket air. Hanger rock and roll g-turn ledge. 50-50 Kevin Harris boardslide street Mark Gonzales. Air pool hang-up fakie out Randy Ruiz. Steps nose bump powerslide axle set. Future Primitive Japan air snake steps camel back. Face plant crailtap rail slide half-cab. Rail regular footed flypaper drop in. Casper slide speed wobbles indy grab ollie hole. </p>
        </section>
        <section class="col-3">
         <h1>Register</h1>
        <form>
            <label class="col-4">
                Name
                <input type="text" v-model="user.name">
            </label>
            <label class="col-4">
                Email
                <input type="email" v-model="user.email">
            </label>
            <label class="col-4">
                Password
                <input type="password" v-model="user.password">
            </label>
            <h2>Adress</h2>
            <label class="col-4">
                Street
                <input type="text" v-model="user.adress.street">
            </label>
                    <label class="col-2">
                Zip Code
                <input type="text" v-model="user.adress.zip">
            </label>
                    <label class="col-2">
                City
                <input type="text" v-model="user.adress.city">
            </label>
            <footer class="col-4">
                <a href="#" class="btn">Sign me up!</a>
            </footer>
         </form>
         </section>
    </main>
</template>
<script>
export default {
    name: 'Register',
    data(){
        return {
            user: {
                email: '',
                password: '',
                name: '',
                adress: {
                    street: '',
                    zip: '',
                    city: ''
                }
            }   
        }
    },
    methods: {
        register(){
            this.$store.dispatch('register', this.user);
        }
    }
}
</script>
<style lang="scss">
#register {
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