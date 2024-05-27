<template>
  <div id="view-score">
    <h1>Scores</h1>
    <select v-model="selectedGameMode">
      <option value="">All</option>
      <option v-for="game in uniqueGameNames" :key="game" :value="game">
        {{ game }}
      </option>
    </select>
    <div class="scores">
      <div v-for="(game, gameId) in filteredScores" :key="gameId">
        <h3>{{ game.game_name }}</h3>
        <div v-if="hasDifficulties(game)">
          <div
            v-for="(difficulty, difficultyId) in game.difficulties"
            :key="difficultyId"
          >
            <div class="difficulty">
              Difficulty: {{ difficulty.difficulty_name }}
            </div>
            <ul>
              <li v-for="(score, index) in difficulty.scores" :key="index">
                Region: {{ score.region }} - Score: {{ score.score }}
              </li>
            </ul>
          </div>
        </div>
        <div v-else>
          <ul>
            <li v-for="(score, index) in game.scores" :key="index">
              Score: {{ score.score }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <button @click="$emit('close')">Close</button>
  </div>
</template>

<script>
export default {
  name: "ViewScore",
  props: {
    scores: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedGameMode: "",
    };
  },
  computed: {
    uniqueGameNames() {
      const gameNames = Object.values(this.scores).map(
        (game) => game.game_name
      );
      return [...new Set(gameNames)];
    },
    filteredScores() {
      if (!this.selectedGameMode) return this.scores;

      return Object.values(this.scores).filter(
        (game) => game.game_name === this.selectedGameMode
      );
    },
  },
  methods: {
    hasDifficulties(game) {
      return game.difficulties && Object.keys(game.difficulties).length > 0;
    },
  },
};
</script>

<style scoped>
#view-score {
  position: absolute;
  width: 50%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #00000080;
  z-index: 2;
  box-shadow: 0px 0px 100px 0px #a3ffb3;
  border-radius: 30px;
  border-color: #1b1b1b;
  border: 6px solid #a3ffb3;
  backdrop-filter: blur(20px);
  overflow: auto;
  max-height: 100vh;
}

h1 {
  color: #a3ffb3;
  text-shadow: 0 0 12px #a3ffb3;
  font-family: "Montserrat", sans-serif;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
}

button {
  position: fixed;
  bottom: 70px;
  z-index: 1;
  padding: 10px 20px;
  margin-top: 20px;
  width: 500px;
}

.scores {
  margin: 20px;
  overflow: auto;
  max-height: 350px;
}

.scores h3 {
  color: #a3ffb3;
  text-shadow: 0 0 12px #a3ffb3;
  margin-top: 10px;
}

.scores ul {
  align-self: flex-start;
  margin-top: 10px;
  margin-right: 20px;
  padding: 0;
  list-style-type: none;
}

.scores ul li {
  align-self: flex-start;
  text-align: left;
}

.difficulty {
  align-self: flex-start;
  text-align: left;
}

.scores > div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

select,
option {
  background-color: #1b1b1b;
  color: rgb(255, 255, 255);
  border: 1px solid rgb(255, 255, 255);
  box-shadow: 0px 0px 7px #fff;
  text-shadow: 0px 0px 3px #fff;
  border-radius: 30px;
  padding: 5px;
  margin: 5px;
  transition: all 0.3s ease;
  position: fixed;
  top: 70px;
  z-index: 1;
}
</style>
