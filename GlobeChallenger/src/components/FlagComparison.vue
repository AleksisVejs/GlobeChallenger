<template>
  <div class="flag-comparison">
    <div class="flag-comparison-container">
      <div class="flag-comparison-flag">
        <h1>Your Flag:</h1>
        <img :src="usersFlag" />
      </div>
      <div class="flag-comparison-flag">
        <h1>{{ countryName }}'s Flag:</h1>
        <img :src="countryFlag" />
      </div>
    </div>
    <button id="play-again-button" @click="$emit('close')">Play Again</button>
  </div>
</template>

<script>
export default {
  name: "FlagComparison",
  props: {
    usersFlag: String,
    countryFlag: String,
    countryName: String,
  },
};
</script>

<style>
.flag-comparison {
  position: absolute;
  font-size: 20px;
  text-shadow: 0 0 7px #fff;
  background-color: #202020dc;
  backdrop-filter: blur(10px);
  border-radius: 25px;
  box-shadow: 0px 0px 50px 0px #a3ffb3;
  padding: 30px;
  width: 600px;
  height: auto;
  z-index: 1;
  border: 4px solid #a3ffb3;
}

.flag-comparison-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
}

.flag-comparison-flag {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
  width: 300px;
  height: 200px;
}

.flag-comparison-flag img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 2px solid #a3ffb3;
  box-shadow: 0px 0px 10px 0px #a3ffb3;
}

.flag-comparison h1 {
  font-size: 20px;
  margin: 10px;
  padding: 0;
  color: #a3ffb3;
  text-shadow: 0 0 7px #a3ffb3;
  font-family: "Montserrat", sans-serif;
}

#play-again-button {
  margin-top: 30px;
  width: 150px;
  height: 30px;
}
</style>
