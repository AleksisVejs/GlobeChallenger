<template>
  <div class="tried-game">
    <div class="main-div">
      <h1 id="tried-game-text">You Tried!</h1>
      <p id="previous-country">
        The previous country was {{ $route.query.previousCountry }}
      </p>
      <p id="final-score">Final Score: {{ $route.query.points }}</p>
      <button id="play-again-button" @click="playAgain">Play Again</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TriedGameView",
  methods: {
    playAgain() {
      this.$router.push("/flagGame");
    },
  },
};
</script>

<style scoped>
.tried-game {
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
  box-shadow: 0px 0px 200px 0px #e5ff00;
  padding: 70px;
  padding-top: 25px;
  border-style: solid;
  border-color: #1b1b1b;
  border: 6px solid #e5ff00;
  text-align: center;
}

#tried-game-text {
  color: #e5ff00;
  font-size: 2rem;
  text-shadow: 0 0 9px #e5ff00;
}

#final-score {
  font-size: 1.5rem;
}

#previous-country {
  font-size: 1.1rem;
}

#play-again-button {
  width: 100px;
}
</style>
