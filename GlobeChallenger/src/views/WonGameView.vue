<template>
  <div class="won-game">
    <div class="won-main-div">
      <h1 id="won-game-text">You Won</h1>
      <p id="final-score">Final Score: {{ $route.query.points }}</p>
      <p id="game-info">
        Game difficulty: {{ $route.query.difficulty }}
        <br />
        Region: {{ $route.query.region }}
      </p>
      <button id="play-again-button" @click="playAgain">Play Again</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "WonGameView",
  methods: {
    playAgain() {
      this.$router.push("/flagGame");
    },
  },
};
</script>

<style scoped>
.won-game {
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

.won-main-div {
  background-color: #20202071;
  border-radius: 30px;
  box-shadow: 0px 0px 200px 0px #48ff00;
  padding: 70px;
  padding-top: 25px;
  border-style: solid;
  border-color: #1b1b1b;
  border: 6px solid #48ff00;
  text-align: center;
}

#won-game-text {
  color: #48ff00;
  font-size: 2rem;
  text-shadow: 0 0 9px #48ff00;
}

#final-score {
  font-size: 1.5rem;
  margin: 20px;
}

#play-again-button {
  width: 100px;
  margin: 0;
}

#game-info {
  font-size: 1.1rem;
  margin: 20px;
}
</style>
