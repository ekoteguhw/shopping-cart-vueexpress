<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Products from './components/Products.vue';

export default {
  name: 'app',
  components: {
    Products,
    Navbar,
  },
};
</script>

<style>

</style>
