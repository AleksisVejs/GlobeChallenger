<template>
  <div class="game-result">
    <div class="game-result-main-div">
      <h1 id="game-result-text">You Lost</h1>
      <button id="play-again-button" @click="playAgain">Play Again</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameOverView",
  methods: {
    playAgain() {
      this.$router.push("/capitalGame");
    },
  },
};
</script>

<style scoped>
.game-result {
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
.game-result-main-div {
  background-color: #20202071;
  border-radius: 30px;
  box-shadow: 0px 0px 200px 0px #ff0000;
  padding: 70px;
  border-style: solid;
  border-color: #1b1b1b;
  border: 6px solid #ff0000;
  text-align: center;
}

#game-result-text {
  color: #ff0000;
  font-size: 2rem;
  text-shadow: 0 0 9px #ff0000;
  margin-top: 0;
}

#play-again-button {
  width: 150px;
  height: 40px;
  margin-top: 0;
}

#play-again-button:hover {
  background-color: #ff0000;
  color: #ffffff;
  border: 2px solid #ff0000;
  box-shadow: 0px 0px 10px 0px #ff0000;
}
</style>
