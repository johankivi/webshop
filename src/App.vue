<template>
  <div id="app">
    <Overlay v-if="overlay"/>
    <Topbar />
    <router-view/>
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
