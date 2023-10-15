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
          <div class="button-text">Flag Game</div>
          <span class="game-mode-desc"
            >Can you guess the country by its flag?</span
          >
        </div>
      </button>
      <button
        class="game-mode-buttons"
        @click="navigateToPopulationGame"
        :style="{ animationDuration: randomDuration() + 's' }"
      >
        <div class="button-content">
          <font-awesome-icon :icon="['fas', 'users']" size="2xl" class="icon" />
          <div class="button-text">Population Game</div>
          <span class="game-mode-desc">
            Can you guess which country has the higher population?
          </span>
        </div>
      </button>
      <button
        class="game-mode-buttons"
        @click="navigateToFlagDrawGame"
        :style="{ animationDuration: randomDuration() + 's' }"
      >
        <div class="button-content">
          <font-awesome-icon
            :icon="['fas', 'pencil']"
            size="2xl"
            class="icon"
          />
          <div class="button-text">Draw That Flag</div>
          <span class="game-mode-desc">
            Draw the flag from the countries description or name.
          </span>
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
      <button
        class="game-mode-buttons"
        :style="{ animationDuration: randomDuration() + 's' }"
      >
        <div class="button-content">
          <font-awesome-icon :icon="['fas', 'gear']" size="2xl" class="icon" />
          <div class="button-text">Work In Progress</div>
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
    navigateToFlagDrawGame() {
      this.$router.push("/flagDrawGame");
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
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1200px;
}

.game-mode-buttons {
  background-color: #20202071;
  border-radius: 30px;
  box-shadow: 0px 0px 90px 0px #a3ffb3;
  padding: 60px;
  margin: 20px;
  border-style: solid;
  border-color: #1b1b1b;
  border: 6px solid #a3ffb3;
  text-align: center;
  width: 350px;
  height: 250px;
  animation: floatUpDown 2s ease-in-out infinite;
}

.game-mode-buttons:hover {
  background-color: #a3ffb3;
  color: #1b1b1b;
  box-shadow: 0px 0px 10px 0px #a3ffb3;
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

.game-mode-desc {
  font-size: 0.9rem;
  margin-top: 15px;
}

@keyframes floatUpDown {
  0% {
    transform: translateY(1%);
  }
  50% {
    transform: translateY(-1%);
  }
  100% {
    transform: translateY(1%);
  }
}

@media (max-width: 768px) {
  #game-modes {
    align-items: center;
    justify-content: center;
    max-width: 100%;
    overflow-y: scroll;
    margin-top: 110px;
    height: calc(100vh - 110px);
  }

  .game-mode-buttons {
    height: 200px;
    width: 300px;
    padding: 10px;
    margin: 10px;
  }
}
</style>
