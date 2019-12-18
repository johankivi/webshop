<template>
    <aside class="login" >
        <img src="@/assets/icon-user-black.svg" alt="login" @click="showModal = !showModal">
        <section v-if="showModal" class="login-modal">
            <label for="">
            Email
                <input type="email" v-model="credentials.email" @keyup.enter="login">
            </label>
            <label for="">
            Password
                <input type="password" v-model="credentials.password">
            </label> 
            <a href="#" class="btn large" @click="login">Login</a>
        </section>
    </aside>
</template>
<script>
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
    methods: {
        login(){
            this.$store.dispatch('auth', this.credentials);
            this.showModal = false;
        }
    }
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

        &:hover {
            cursor: pointer;
        }

        img {
            width: 80%;
            opacity: .6;
            transform: translateY(-1px);
        }

        .login-modal {
            width: 18rem;
            padding: 1rem;
            background: white;
            position: absolute;
            top: 3.25rem;
            z-index: 222;
            box-shadow: 0 0 3rem rgba(0,0,0,.2);

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