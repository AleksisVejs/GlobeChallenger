<template>
  <div class="end-game">
    <div class="main-div">
      <h1 id="end-game-text">You Lost</h1>
      <p id="final-score">Final Score: {{ points }}</p>
      <button id="play-again-button" @click="playAgain">Play Again</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EndGameView",
  props: {
    points: Number,
  },
  methods: {
    playAgain() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.end-game {
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
  box-shadow: 0px 0px 200px 0px #ff0000;
  padding: 70px;
  padding-top: 25px;
  border-style: solid;
  border-color: #1b1b1b;
  border: 6px solid #ff0000;
  text-align: center;
}

#end-game-text {
  color: #ff0000;
  font-size: 2rem;
  text-shadow: 0 0 9px #ff0000;
}

#final-score {
  font-size: 1.5rem;
}
</style>
