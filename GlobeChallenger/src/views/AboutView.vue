<template>
  <div class="about">
    <div class="main-div">
      <div class="about-header">
        <h1>About</h1>
      </div>
      <br />
      <font-awesome-icon
        :icon="['fas', 'globe-americas']"
        size="sm"
        style="color: #a3ffb3; filter: drop-shadow(0 0 5px #a3ffb3)"
      />
      Welcome to Globe Challenger, a geography quiz game that challenges your
      knowledge of countries. Test your geographical knowledge with this
      educational and engaging web-based game.
      <br />
      <br />
      <font-awesome-icon
        :icon="['fas', 'map']"
        size="sm"
        style="color: #a3ffb3; filter: drop-shadow(0 0 5px #a3ffb3)"
      />
      Explore Global Diversity: Choose your preferred region from Africa,
      Americas, Asia, Europe, and Oceania, or take on a comprehensive global
      challenge.
      <br />
      <br />
      <font-awesome-icon
        :icon="['fas', 'flag']"
        size="sm"
        style="color: #a3ffb3; filter: drop-shadow(0 0 5px #a3ffb3)"
      />
      Globe Challenger not only tests your geography knowledge but also enhances
      your understanding of world flags and regions.
      <br />
      <br />
      <br />
      <font-awesome-icon
        :icon="['fas', 'person']"
        size="sm"
        style="color: #a3ffb3; filter: drop-shadow(0 0 5px #a3ffb3)"
      />
      Created by Aleksis Vējš
    </div>
  </div>
</template>

<script></script>

<style scoped>
.about {
  position: relative;
  color: #f1f1f1;
  font-family: "Montserrat", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  z-index: 1;
}

.main-div {
  background-color: #20202071;
  border-radius: 30px;
  box-shadow: 0px 0px 200px 0px #a3ffb3;
  padding: 50px;
  padding-top: 25px;
  border-style: solid;
  border-color: #1b1b1b;
  border: 6px solid #a3ffb3;
  text-align: center;
}

.about-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.about-header h1 {
  color: #a3ffb3;
  font-size: 2rem;
  text-shadow: 0 0 9px #a3ffb286;
  margin: 0;
}
</style>
