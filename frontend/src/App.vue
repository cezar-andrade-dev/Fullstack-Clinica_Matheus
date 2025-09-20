<template>
  <div id="app">
    <FormularioMatricula />
  </div>
</template>

<script>
import FormularioMatricula from "./components/FormularioMatricula.vue";

export default {
  name: "App",
  components: {
    FormularioMatricula,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Arial", sans-serif;
  background-color: #f5f5f5;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
</style>
