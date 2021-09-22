<template>
  <navbar />
  <div class="app-container"><router-view /></div>
  <Footer />
</template>
<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
export default {
  components: {
    Navbar,
    Footer
  },
  beforeCreate() {
    this.$store.dispatch('authenticate');
  }
}
</script>