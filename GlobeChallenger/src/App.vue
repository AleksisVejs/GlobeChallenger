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
  overflow: hidden;
}

p {
  color: #fff;
  text-shadow: 0 0 9px #fff;
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
  min-height: 100%;
  min-width: 100%;
}

button {
  background-color: transparent;
  color: rgb(255, 255, 255);
  border: 1px solid rgb(255, 255, 255);
  box-shadow: 0px 0px 7px #fff;
  text-shadow: 0px 0px 3px #fff;
  border-radius: 30px;
  padding: 5px;
  margin: 5px;
  transition: all 0.3s ease;
}

button:hover {
  border: 1px solid #a3ffb3;
  background-color: #a3ffb3;
  color: #1b1b1b;
  box-shadow: 0px 0px 20px 0px #a3ffb3;
  cursor: pointer;
}
</style>
