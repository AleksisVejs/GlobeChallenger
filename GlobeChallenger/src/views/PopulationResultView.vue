<template>
  <div class="population-result">
    <div class="population-result-main-div">
      <h1 id="population-result-text">You Scored:</h1>
      <p id="final-score">{{ $route.query.points }}</p>
      <button id="play-again-button" @click="playAgain">Play Again</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopulationResultView",
  methods: {
    playAgain() {
      this.$router.push("/populationGame");
    },
  },
};
</script>

<style scoped>
.population-result {
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
.population-result-main-div {
  background-color: #20202071;
  border-radius: 30px;
  box-shadow: 0px 0px 200px 0px #a3ffb3;
  padding: 70px;
  padding-top: 25px;
  border-style: solid;
  border-color: #1b1b1b;
  border: 6px solid #a3ffb3;
  text-align: center;
}

#population-result-text {
  color: #a3ffb3;
  font-size: 2rem;
  text-shadow: 0 0 9px #a3ffb3;
}

#final-score {
  font-size: 1.5rem;
}

#play-again-button {
  width: 150px;
  height: 40px;
}
</style>
