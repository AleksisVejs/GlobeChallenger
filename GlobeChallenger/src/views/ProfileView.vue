<template>
  <div class="profile">
    <div class="main-div">
      <div class="profile-header">
        <div class="left-section">
          <div class="profile-picture">
            <img src="../assets/user.png" alt="Profile Picture" />
          </div>
          <h1>{{ user ? user.username : "" }}</h1>
        </div>
        <div class="user-info" v-if="user">
          <p>Email: {{ user.email }}</p>
          <p>Joined: {{ user.createdAt }}</p>
        </div>
        <div class="edit-profile">
          <button>Edit Profile</button>
        </div>
      </div>
      <div class="game-stats">
        <h2>Game Statistics</h2>
        <div class="game-stat">
          <div class="game-stat-title">
            <h3>
              <font-awesome-icon :icon="['fas', 'flag']" size="sm" />
              Flag Game
              <font-awesome-icon
                class="icon-game-list"
                id="icon-flag-game-list"
                @click="toggleFlagGameList"
                :icon="['fas', iconFlagGameList]"
                size="sm"
              />
            </h3>
            <ul
              v-if="user && iconFlagGameList === 'chevron-up'"
              class="game-stat-list"
            >
              <li>
                All: {{ user.flagGameScore ? user.flagGameScore.All : "" }}
              </li>
              <li>
                Africa:
                {{ user.flagGameScore ? user.flagGameScore.Africa : "" }}
              </li>
              <li>
                Americas:
                {{ user.flagGameScore ? user.flagGameScore.Americas : "" }}
              </li>
              <li>
                Asia: {{ user.flagGameScore ? user.flagGameScore.Asia : "" }}
              </li>
              <li>
                Europe:
                {{ user.flagGameScore ? user.flagGameScore.Europe : "" }}
              </li>
              <li>
                Oceania:
                {{ user.flagGameScore ? user.flagGameScore.Oceania : "" }}
              </li>
              <li>Games played: {{ user.flagGamePlayed }}</li>
            </ul>
          </div>
        </div>
        <div class="game-stat">
          <div class="game-stat-title">
            <h3>
              <font-awesome-icon :icon="['fas', 'users']" size="sm" />
              Population Game
              <font-awesome-icon
                class="icon-game-list"
                id="icon-population-game-list"
                @click="togglePopulationGameList"
                :icon="['fas', iconPopulationGameList]"
                size="sm"
              />
            </h3>
            <ul
              v-if="user && iconPopulationGameList === 'chevron-up'"
              class="game-stat-list"
            >
              <li>Best Score: {{ user.populationGameScore }}</li>
              <li>Games Played: {{ user.populationGamePlayed }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iconFlagGameList: "chevron-down",
      iconPopulationGameList: "chevron-down",
    };
  },
  computed: {
    user() {
      const user = this.$store.state.user;
      if (!user || !user.flagGameScore) {
        return {};
      }
      return user;
    },
  },

  methods: {
    toggleFlagGameList() {
      if (this.iconFlagGameList === "chevron-down") {
        this.iconFlagGameList = "chevron-up";
      } else {
        this.iconFlagGameList = "chevron-down";
      }
    },

    togglePopulationGameList() {
      if (this.iconPopulationGameList === "chevron-down") {
        this.iconPopulationGameList = "chevron-up";
      } else {
        this.iconPopulationGameList = "chevron-down";
      }
    },
  },
};
</script>

<style scoped>
.profile {
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
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.left-section {
  display: flex;
  align-items: center;
}

.left-section h1 {
  color: #a3ffb3;
  font-size: 2rem;
  text-shadow: 0 0 12px #a3ffb3;
}

.edit-profile {
  margin-top: 20px;
}

.edit-profile button {
  width: 200px;
  height: 40px;
}

.profile-picture {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
  box-shadow: 0 0 20px #ffffff6b;
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info {
  margin-top: 30px;
  margin-bottom: 30px;
}

.user-info p {
  color: #ffffff;
  text-shadow: 0 0 9px #ffffff;
  font-size: 1rem;
}

.game-stats {
  flex-grow: 1;
  margin-left: 60px;
}

.game-stats h2 {
  color: #a3ffb3;
  font-size: 1.5rem;
  text-shadow: 0 0 9px #a3ffb286;
  margin: 0;
}

.game-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.game-stat-title {
  border-radius: 5px;
  padding: 5px 10px;
  text-align: center;
}

.game-stat-title h3 {
  color: #a3ffb3;
  font-size: 1.2rem;
  margin: 0;
  text-shadow: 0 0 5px #a3ffb286;
  user-select: none;
}

.icon-game-list {
  color: #a3ffb3;
  filter: drop-shadow(0 0 5px #a3ffb3);
  margin-left: 10px;
  cursor: pointer;
}

.icon-game-list:hover {
  color: #ffffff;
  filter: drop-shadow(0 0 5px #ffffff);
}

.game-stat-list {
  list-style: none;
  padding: 0;
  margin-top: 10px;
  text-align: center;
}

.game-stat-list li {
  color: #ffffff;
  text-shadow: 0 0 5px #ffffff;
  margin: 5px 0;
  font-size: 1rem;
}

.game-stat-list li span {
  color: #ffffff;
  margin-right: 5px;
}
</style>
