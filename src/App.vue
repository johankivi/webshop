<template>
  <div id="app">
    <transition name="drop">
      <Overlay v-if="overlay"/>
    </transition>
    <Topbar />
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>
<script>
import Topbar from '@/components/Topbar';
import Overlay from '@/components/Overlay';

export default {
  name: 'App',
  components: {
    Topbar,
    Overlay
  },
  computed: {
    overlay(){
      return this.$store.state.overlay.active;
    }
  }
}
</script>
<style lang="scss">
@import './scss/main';
</style>
