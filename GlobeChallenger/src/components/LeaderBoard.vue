<template>
  <div class="leaderboard">
    <h2>Leaderboard</h2>

    <!-- Game Selection -->
    <div class="game-filters">
      <button
        v-for="game in availableGames"
        :key="game.id"
        :class="{ active: selectedGame === game.id }"
        @click="selectGame(game.id)"
      >
        {{ game.name }}
      </button>
    </div>

    <!-- Flag Game Filters -->
    <div v-if="selectedGame === 1" class="filter-dropdowns">
      <select v-model="selectedDifficulty" class="filter-select">
        <option value="">All Difficulties</option>
        <option value="1">Easy</option>
        <option value="2">Medium</option>
        <option value="3">Hard</option>
      </select>
      <select v-model="selectedRegion" class="filter-select">
        <option value="">All Regions</option>
        <option value="all">Global</option>
        <option value="europe">Europe</option>
        <option value="asia">Asia</option>
        <option value="africa">Africa</option>
        <option value="americas">Americas</option>
        <option value="oceania">Oceania</option>
      </select>
    </div>

    <!-- Leaderboard Cards -->
    <div v-if="filteredLeaderboard.length" class="leaderboard-list">
      <!-- Top 3 Players -->
      <div class="top-players">
        <!-- Second Place -->
        <div v-if="filteredLeaderboard[1]" class="top-player second-place">
          <div class="rank">
            2. <font-awesome-icon :icon="['fas', 'trophy']" />
          </div>
          <div class="username">{{ filteredLeaderboard[1].username }}</div>
          <div class="score">
            <span class="score-number">{{ filteredLeaderboard[1].score }}</span>
            <span class="points-text">points</span>
          </div>
          <div v-if="selectedGame === 1" class="details">
            {{ filteredLeaderboard[1].difficulty_name }} • {{ filteredLeaderboard[1].region }}
          </div>
        </div>

        <!-- First Place -->
        <div v-if="filteredLeaderboard[0]" class="top-player first-place">
          <div class="rank">
            1. <font-awesome-icon :icon="['fas', 'trophy']" />
          </div>
          <div class="username">{{ filteredLeaderboard[0].username }}</div>
          <div class="score">
            <span class="score-number">{{ filteredLeaderboard[0].score }}</span>
            <span class="points-text">points</span>
          </div>
          <div v-if="selectedGame === 1" class="details">
            {{ filteredLeaderboard[0].difficulty_name }} • {{ filteredLeaderboard[0].region }}
          </div>
        </div>

        <!-- Third Place -->
        <div v-if="filteredLeaderboard[2]" class="top-player third-place">
          <div class="rank">
            3. <font-awesome-icon :icon="['fas', 'trophy']" />
          </div>
          <div class="username">{{ filteredLeaderboard[2].username }}</div>
          <div class="score">
            <span class="score-number">{{ filteredLeaderboard[2].score }}</span>
            <span class="points-text">points</span>
          </div>
          <div v-if="selectedGame === 1" class="details">
            {{ filteredLeaderboard[2].difficulty_name }} • {{ filteredLeaderboard[2].region }}
          </div>
        </div>
      </div>

      <!-- Rest of Players -->
      <div class="player-cards">
        <div
          v-for="entry in filteredLeaderboard.slice(3)"
          :key="`${entry.username}-${entry.score}`"
          class="player-card"
          :style="{ '--rank': entry.rank }"
        >
          <div class="rank">{{ entry.rank }}.</div>
          <div class="player-info">
            <div class="username">{{ entry.username }}</div>
            <div v-if="selectedGame === 1" class="details">
              {{ entry.difficulty_name }} • {{ entry.region }}
            </div>
          </div>
          <div class="score">
            <span class="score-number">{{ entry.score }}</span>
            <span class="points-text">points</span>
          </div>
        </div>
      </div>
    </div>
    <p v-else>No leaderboard data available for selected game.</p>
  </div>
</template>

<script>
export default {
  name: "LeaderBoard",
  data() {
    return {
      leaderboard: {},
      selectedGame: 1,
      selectedDifficulty: "",
      selectedRegion: "",
      availableGames: [
        { id: 1, name: "Flag Game" },
        { id: 2, name: "Population Game" },
        { id: 3, name: "Capital Game" },
      ],
    };
  },
  computed: {
    filteredLeaderboard() {
      console.log("Selected game:", this.selectedGame);
      console.log("Raw leaderboard data:", this.leaderboard);

      const formatted = [];
      const gameData = this.leaderboard[this.selectedGame];
      console.log("Game data for selected game:", gameData);

      if (!gameData) return [];

      if (this.selectedGame === 1) {
        // Flag Game with filters
        Object.entries(gameData.difficulties || {}).forEach(
          ([diffId, diffData]) => {
            if (
              !this.selectedDifficulty ||
              diffId === this.selectedDifficulty
            ) {
              Object.entries(diffData.regions).forEach(([region, scores]) => {
                if (!this.selectedRegion || region === this.selectedRegion) {
                  scores.forEach((score) => {
                    formatted.push({
                      ...score,
                      difficulty_name: diffData.difficulty_name,
                      region: region,
                    });
                  });
                }
              });
            }
          }
        );
      } else {
        // Population and Capital Games
        // Get all scores from all difficulties
        Object.values(gameData.difficulties || {}).forEach((diffData) => {
          Object.values(diffData.regions || {}).forEach((scores) => {
            scores.forEach((score) => {
              formatted.push({
                rank: score.rank,
                username: score.username,
                score: score.score,
              });
            });
          });
        });
      }

      // Remove duplicates and sort by score
      const uniqueScores = formatted.reduce((acc, current) => {
        const x = acc.find((item) => item.username === current.username);
        if (!x) {
          return acc.concat([current]);
        } else if (current.score > x.score) {
          return acc.map((item) =>
            item.username === current.username ? current : item
          );
        } else {
          return acc;
        }
      }, []);

      return uniqueScores
        .sort((a, b) => b.score - a.score)
        .map((score, index) => ({
          ...score,
          rank: index + 1,
        }));
    },
  },
  methods: {
    async fetchLeaderboard() {
      try {
        await this.$store.dispatch("fetchLeaderboard");
        console.log("Leaderboard data:", this.$store.state.leaderboard); // Debug log
        this.leaderboard = this.$store.state.leaderboard;
      } catch (error) {
        console.error("Leaderboard fetch error:", error);
      }
    },
    selectGame(gameId) {
      this.selectedGame = gameId;
      this.selectedDifficulty = "";
      this.selectedRegion = "";
    },
  },
  mounted() {
    this.fetchLeaderboard();
  },
};
</script>

<style scoped>
.leaderboard {
  background-color: #20202071;
  border-radius: 30px;
  box-shadow: 0px 0px 30px 0px #a3ffb3;
  border: 6px solid #a3ffb3;
  padding: 15px;
  margin: 30px;
  max-width: 600px;
  min-width: 600px;
  min-height: 600px;
  height: 50vh;
  overflow-y: auto;
  color: #f1f1f1;
}

.leaderboard h2 {
  text-align: center;
  color: #a3ffb3;
  margin-bottom: 20px;
  font-size: 1.8em;
}

.game-filters {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.game-filters button {
  padding: 6px 12px;
  border: 2px solid #a3ffb3;
  background-color: transparent;
  color: #a3ffb3;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.85em;
  min-width: 100px;
}

.game-filters button:hover {
  background-color: #a3ffb3;
  color: #1b1b1b;
}

.filter-dropdowns {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.filter-select {
  padding: 6px 12px;
  border: 2px solid #a3ffb3;
  background-color: rgba(27, 27, 27, 0.9);
  color: #a3ffb3;
  border-radius: 6px;
  cursor: pointer;
  min-width: 100px;
  font-size: 0.9em;
  transition: all 0.3s ease;
}

.filter-select:hover {
  background-color: #a3ffb3;
  color: #1b1b1b;
}

.filter-select:focus {
  outline: none;
}

.top-players {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 20px;
  margin: 40px 0;
  padding: 20px;
  position: relative;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes floatSmall {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);
  }
}

.top-player {
  text-align: center;
  padding: 15px;
  border-radius: 15px;
  background: rgba(163, 255, 179, 0.1);
  transition: all 0.3s ease;
  min-width: 120px;
  position: relative;
  box-shadow: 0 4px 15px rgba(163, 255, 179, 0.1);
  animation: floatSmall 3s ease-in-out infinite;
}

.first-place {
  padding: 25px 15px;
  background: linear-gradient(145deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1));
  transform: scale(1.1);
  border: 2px solid rgba(255, 215, 0, 0.3);
  animation: float 4s ease-in-out infinite;
  box-shadow: 0 8px 20px rgba(255, 215, 0, 0.2);
}

.second-place {
  background: linear-gradient(145deg, rgba(192, 192, 192, 0.2), rgba(192, 192, 192, 0.1));
  border: 2px solid rgba(192, 192, 192, 0.3);
  animation: floatSmall 4s ease-in-out infinite 0.5s;
  box-shadow: 0 6px 15px rgba(192, 192, 192, 0.2);
}

.third-place {
  background: linear-gradient(145deg, rgba(205, 127, 50, 0.2), rgba(205, 127, 50, 0.1));
  border: 2px solid rgba(205, 127, 50, 0.3);
  animation: floatSmall 4s ease-in-out infinite 1s;
  box-shadow: 0 6px 15px rgba(205, 127, 50, 0.2);
}

.player-cards {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 350px;
  margin: 0 auto;
  padding: 0 20px;
}

.player-card {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.03));
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid rgba(163, 255, 179, 0.1);
  animation: floatSmall 4s ease-in-out infinite;
  animation-delay: calc(var(--rank) * 0.2s);
}

.player-card:hover {
  transform: translateX(5px) translateY(-5px);
  background: rgba(163, 255, 179, 0.05);
  box-shadow: 0 4px 15px rgba(163, 255, 179, 0.1);
}

.rank {
  font-size: 1.3em;
  font-weight: bold;
  min-width: 45px;
  color: #a3ffb3;
  display: flex;
  align-items: center;
  gap: 5px;
}

.player-info {
  flex-grow: 1;
  padding: 0 15px;
}

.username {
  font-size: 1.2em;
  color: #ffffff;
  font-weight: 500;
}

.details {
  font-size: 0.9em;
  color: #a3ffb3;
  opacity: 0.8;
}

.score {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 80px;
}

.score-number {
  font-size: 1.5em;
  font-weight: bold;
  color: #a3ffb3;
  text-shadow: 0 0 10px rgba(163, 255, 179, 0.3);
  letter-spacing: 1px;
}

.points-text {
  font-size: 0.7em;
  color: rgba(163, 255, 179, 0.8);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.top-player .score {
  margin-top: 8px;
}

.first-place .score-number {
  font-size: 1.8em;
  color: #ffd700;
  text-shadow: 0 0 15px rgba(255, 215, 0, 0.4);
}

.first-place .points-text {
  color: rgba(255, 215, 0, 0.8);
}

.second-place .score-number {
  font-size: 1.6em;
  color: #c0c0c0;
  text-shadow: 0 0 12px rgba(192, 192, 192, 0.4);
}

.second-place .points-text {
  color: rgba(192, 192, 192, 0.8);
}

.third-place .score-number {
  font-size: 1.6em;
  color: #cd7f32;
  text-shadow: 0 0 12px rgba(205, 127, 50, 0.4);
}

.third-place .points-text {
  color: rgba(205, 127, 50, 0.8);
}

.player-card .score {
  flex-direction: row;
  gap: 5px;
  align-items: baseline;
}

.player-card .score-number {
  font-size: 1.3em;
}

.player-card .points-text {
  font-size: 0.65em;
}

@media (max-width: 768px) {
  .leaderboard {
    height: 70vh;
    margin: 10px;
    padding: 15px;
  }

  .top-players {
    margin: 20px 0;
    padding: 10px;
  }

  .first-place {
    transform: scale(1.05);
  }
}
</style>
