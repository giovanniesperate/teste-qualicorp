<template>
  <div id="app">
    <DefaultNavbar />
    <DatatableCliente />
  </div>
</template>

<script>
import DefaultNavbar from "./components/Navbar.vue";
import DatatableCliente from "./components/DatatableCliente.vue";

export default {
  name: "App",
  components: {
    DefaultNavbar,
    DatatableCliente,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
