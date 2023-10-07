<template>
  <div class="home">
    <div id="game-modes">
      <button
        class="game-mode-buttons"
        @click="navigateToFlagGame"
        :style="{ animationDuration: randomDuration() + 's' }"
      >
        <div class="button-content">
          <font-awesome-icon :icon="['fas', 'flag']" size="2xl" class="icon" />
          <div class="button-text">Guess The Flag</div>
        </div>
      </button>
      <button
        class="game-mode-buttons"
        @click="navigateToPopulationGame"
        :style="{ animationDuration: randomDuration() + 's' }"
      >
        <div class="button-content">
          <font-awesome-icon :icon="['fas', 'users']" size="2xl" class="icon" />
          <div class="button-text">Guess The Population</div>
        </div>
      </button>
      <button
        class="game-mode-buttons"
        :style="{ animationDuration: randomDuration() + 's' }"
      >
        <div class="button-content">
          <font-awesome-icon :icon="['fas', 'gear']" size="2xl" class="icon" />
          <div class="button-text">Work In Progress</div>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  methods: {
    navigateToFlagGame() {
      this.$router.push("/flagGame");
    },
    navigateToPopulationGame() {
      this.$router.push("/populationGame");
    },
    randomDuration() {
      return (Math.random() * 1 + 2).toFixed(2); //
    },
  },
};
</script>

<style scoped>
.home {
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

#game-modes {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.game-mode-buttons {
  background-color: #20202071;
  border-radius: 30px;
  box-shadow: 0px 0px 100px 0px #a3ffb3;
  padding: 60px;
  border-style: solid;
  border-color: #1b1b1b;
  border: 6px solid #a3ffb3;
  text-align: center;
  width: 300px;
  height: 300px;
  animation: floatUpDown 2s ease-in-out infinite;
}

.game-mode-buttons:hover {
  background-color: #a3ffb3;
  color: #1b1b1b;
  box-shadow: 0px 0px 20px 0px #a3ffb3;
  cursor: pointer;
  transition: all 0.5s;
  animation-play-state: paused;
}

.icon {
  color: #a3ffb3;
  filter: drop-shadow(0 0 3px #a3ffb3);
  transition: all 0.3s;
}

.game-mode-buttons:hover .icon {
  color: #000000;
}

.button-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.button-text {
  font-size: 1.5rem;
  margin-top: 15px;
}

@keyframes floatUpDown {
  0% {
    transform: translateY(10%);
  }
  50% {
    transform: translateY(-4%);
  }
  100% {
    transform: translateY(10%);
  }
}
</style>
