<template>
  <div class="home">
    <div class="main-div">
      <div id="game-modes">
        <h1 id="game-mode-text">
          <font-awesome-icon
            :icon="['fas', 'gamepad']"
            size="sm"
            style="color: #a3ffb3; filter: drop-shadow(0 0 3px #a3ffb3)"
          />
          Choose a game mode:
        </h1>
        <div id="game-mode-buttons">
          <button @click="navigateToFlagGame">
            <font-awesome-icon :icon="['fas', 'flag']" size="sm" class="icon" />
            Guess The Flag
          </button>
          <button>
            <font-awesome-icon :icon="['fas', 'gear']" size="sm" class="icon" />
            Work In Progress
          </button>
          <button>
            <font-awesome-icon :icon="['fas', 'gear']" size="sm" class="icon" />
            Work In Progress
          </button>
        </div>
      </div>
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

.main-div {
  background-color: #20202071;
  border-radius: 30px;
  box-shadow: 0px 0px 200px 0px #a3ffb3;
  padding: 60px;
  border-style: solid;
  border-color: #1b1b1b;
  border: 6px solid #a3ffb3;
  text-align: center;
}

#game-modes {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#game-mode-text {
  color: #a3ffb3;
  font-size: 2rem;
  text-shadow: 0 0 9px #a3ffb286;
  margin: 0;
  margin-bottom: 20px;
}

#game-mode-buttons {
  display: grid;
  align-items: center;
  justify-content: center;
}

#game-mode-buttons button {
  margin: 10px;
  padding: 10px;
  font-size: 20px;
  border-radius: 5px;
  border: 1px solid rgb(255, 255, 255);
  color: rgb(255, 255, 255);
  background-color: transparent;
  cursor: pointer;
  transition: 0.3s;
}

#game-mode-buttons button:hover {
  border: 1px solid #a3ffb3;
  background-color: #a3ffb3;
  color: #1b1b1b;
  box-shadow: 0px 0px 20px 0px #a3ffb3;
  cursor: pointer;
}

.icon {
  color: #a3ffb3;
  filter: drop-shadow(0 0 3px #a3ffb3);
  transition: color 0.3s; /* Add transition for the color */
}

#game-mode-buttons button:hover .icon {
  color: #000000;
}
</style>
