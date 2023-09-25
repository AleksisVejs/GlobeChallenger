<template>
  <div id="app">
    <NavigationBar />
    <img id="world-video" src="./assets/worldrotating.gif" />
    <router-view />
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";
export default {
  name: "App",
  components: {
    NavigationBar,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");

body,
html {
  background-color: #202020;
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#world-video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 0;
}
</style>
