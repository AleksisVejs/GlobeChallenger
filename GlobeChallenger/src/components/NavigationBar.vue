<template>
  <nav>
    <div class="left-links">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <div class="header">
      <h1>Globe Challenger</h1>
    </div>
    <div class="right-links">
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
    </div>
  </nav>
</template>

<style>
nav {
  background-color: #20202071;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
  border-radius: 2rem;
  box-shadow: 0 0 22px #a3ffb2;
  border: 5px solid #a3ffb3;
  z-index: 2;
  margin-top: 1rem;
  margin-left: 2rem;
  margin-right: 2rem;
}

.left-links,
.right-links {
  display: flex;
  padding: 0 1rem;
}

.header {
  flex-grow: 1; /* Take up remaining space */
  text-align: center;
}

.header h1 {
  color: #a3ffb3;
  font-size: 2rem;
  text-shadow: 0 0 9px #a3ffb286;
  margin: 0;
}

nav a {
  color: rgba(255, 255, 255, 0.568);
  text-decoration: none;
  padding: 1rem;
  font-size: 1.3rem;
  transition: 0.3s;
  text-shadow: 0px 0px 3px #ffffff;
}

nav a.router-link-exact-active {
  color: rgb(255, 255, 255);
  text-shadow: 0px 0px 6px #ffffff;
  font-size: 1.5rem;
}

nav a:hover {
  color: rgb(255, 255, 255);
  text-shadow: 0px 0px 3px #ffffff;
  font-size: 1.5rem;
}
</style>
