<template>
  <header id="topbar">
      <img src="@/assets/sinus-logo.svg" alt="logo">
    <nav>
      <router-link to="/">Products</router-link>
      <router-link v-if="auth.loggedIn" to="/me">My Account</router-link>
      <router-link v-if="!auth.loggedIn" to="/register">Register</router-link>
      <router-link to="/documentation">Documentation</router-link>
      <router-link to="/admin" v-if="auth.user.role == 'admin'">Admin Area</router-link>
    </nav>
    <cart />
  </header>
</template>
<script>
import cart from './Cart'

export default {
  name: 'topbar',
  components:  {
    cart
  },
  computed: {
    auth(){
      return this.$store.state.auth;
    }
  }
}
</script>
<style lang="scss">
  @import '../scss/variables';

  #topbar {
    display: flex;
    padding: 2rem 0;
    align-items: center;
    max-width: 1000px;
    margin: 0 auto;

    img {
      max-width: 10rem;
    }

    nav {
      flex: 1;
      display: flex;
      justify-content: flex-end;


      a {
        color: $middleGrey;
        margin: 0 1rem;
        padding: .5rem 0 .375rem 0;
        text-decoration: none;
        border-bottom: .25rem solid rgba(0,0,0,0);

        &:hover {
          border-bottom: .25rem solid $darkGrey;
          color: $darkGrey;
        }

        &.router-link-exact-active {
          font-weight: 800;
          border-bottom: .25rem solid $darkGrey;
          color: $darkGrey; 
        }

      }

    }

  }
</style>
