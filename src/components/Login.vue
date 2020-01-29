<template>
    <aside class="login" v-click-outside="close">
        <div class="icon" @click="showModal = !showModal">
            <img src="@/assets/icon-user-black.svg" alt="login" >
        </div>
        <form v-if="showModal && !auth.loggedIn" class="login-modal">
            <label for="">
            Email
                <input type="email" v-model="credentials.email" @keyup.enter="login" autocomplete="off">
            </label>
            <label for="">
            Password
                <input type="password" v-model="credentials.password" autocomplete="off">
            </label> 
            <a href="#" class="btn large" @click="login">Login</a>
        </form>
        <section v-if="showModal && auth.loggedIn" class="login-modal">
            <p> {{auth.user.name}} </p>
            <a href="#" class="btn large" @click="logout">Logout</a>
        </section>
    </aside>
</template>
<script>
import ClickOutside from 'vue-click-outside'

export default {
    name: 'Login',
    data(){
        return {
            showModal: false,
            credentials: {
                email: '',
                password: ''
            }
        }
    },
    computed: {
        auth(){
            return this.$store.state.auth;
        }
    },
    methods: {
        login(){
            this.$store.dispatch('login', this.credentials);
            this.showModal = false;
        },
        logout(){
            this.$store.dispatch('logout')            
        },
        close(){
            this.showModal = false
        }
    },
    directives:{ClickOutside}
}
</script>
<style lang="scss">
  @import '../scss/variables';

    .login {
        background: $lightGrey;
        width: 1.8rem;
        height: 1.8rem;
        padding: .25rem;
        margin-left: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 999rem;
        position: relative;


        .icon{
            display: flex;
            justify-content: center;
            align-items: center;

            &:hover {
                cursor: pointer;
            }
            img {
                width: 70%;
                opacity: .6;
                transform: translateY(-1px);
            }
        }

        .login-modal {
            width: 18rem;
            padding: 1rem;
            background: white;
            position: absolute;
            top: 3.25rem;
            z-index: 222;
            box-shadow: 0 0 3rem rgba(0,0,0,.2);
            display: block;

            &:after {
                content: '';
                position: absolute;
                top: 0;
                left: 50%;
                width: 0;
                height: 0;
                border: 0.625em solid transparent;
                border-bottom-color: white;
                border-top: 0;
                margin-left: -0.625em;
                margin-top: -0.625em;
            }
            label {
                font-size: .8rem;

                input {
                    width: 100%;
                    padding: .75rem;
                    margin: .25rem 0 .25rem 0;
                    box-sizing: border-box;
                    border-radius: $round;
                    border: 1px solid $lightGrey;
                    font-size: 1rem;
                    transition: all .2s ease;

                    &:focus {
                        border: 1px solid black;
                        outline: none;
                    }
                }
            }

            .btn {
                margin-top: 1rem;
            }

        }
    }

</style>