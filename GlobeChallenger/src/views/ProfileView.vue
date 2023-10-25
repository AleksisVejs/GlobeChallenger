<template>
  <div class="profile">
    <div class="profile-main-div">
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
              <font-awesome-icon
                class="profile-icon"
                :icon="['fas', 'flag']"
                size="sm"
              />
              Flag Game
              <font-awesome-icon
                class="icon-game-list"
                @click="toggleList('flag')"
                :icon="['fas', iconList('flag')]"
                size="sm"
              />
            </h3>
            <transition name="slide">
              <ul
                v-if="user && iconList('flag') === 'chevron-up'"
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
              </ul>
            </transition>
          </div>
        </div>
        <div class="game-stat">
          <div class="game-stat-title">
            <h3>
              <font-awesome-icon
                class="profile-icon"
                :icon="['fas', 'users']"
                size="sm"
              />
              Population Game
              <font-awesome-icon
                class="icon-game-list"
                @click="toggleList('population')"
                :icon="['fas', iconList('population')]"
                size="sm"
              />
            </h3>
            <transition name="slide">
              <ul
                v-if="user && iconList('population') === 'chevron-up'"
                class="game-stat-list"
              >
                <li>Best Score: {{ user.populationGameScore }}</li>
              </ul>
            </transition>
          </div>
        </div>
        <div class="game-stat">
          <div class="game-stat-title">
            <h3>
              <font-awesome-icon
                class="profile-icon"
                :icon="['fas', 'city']"
                size="sm"
              />
              Population Game
              <font-awesome-icon
                class="icon-game-list"
                @click="toggleList('capital')"
                :icon="['fas', iconList('capital')]"
                size="sm"
              />
            </h3>
            <transition name="slide">
              <ul
                v-if="user && iconList('capital') === 'chevron-up'"
                class="game-stat-list"
              >
                <li>Best Score: {{ user.capitalGameScore }}</li>
              </ul>
            </transition>
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
      list: {
        flag: false,
        population: false,
        capital: false,
      },
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
    toggleList(game) {
      this.list[game] = !this.list[game];
    },

    iconList(game) {
      return this.list[game] ? "chevron-up" : "chevron-down";
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

.profile-main-div {
  background-color: #20202071;
  border-radius: 30px;
  box-shadow: 0px 0px 100px 0px #a3ffb3;
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
  color: #ffffff;
  font-size: 2rem;
  text-shadow: 0 0 12px #ffffff;
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
  color: #ffffff;
  font-size: 1.5rem;
  text-shadow: 0 0 9px #ffffff;
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

.profile-icon {
  color: #a3ffb3;
  filter: drop-shadow(0 0 5px #a3ffb3);
  margin-right: 10px;
}

.slide-enter-active {
  animation: slide-in 0.5s ease-out forwards;
}

.slide-leave-active {
  animation: slide-out 0.2s ease-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateY(-5%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-5%);
  }
}

@media (max-width: 768px) {
  .profile-main-div {
    padding: 30px 50px 40px 50px;
    flex-direction: column;
    align-items: center;
  }

  .game-stats {
    margin-left: 0;
    margin-top: 30px;
  }

  .game-stat-title h3 {
    font-size: 1rem;
  }

  .game-stat-list li {
    font-size: 0.8rem;
  }

  .edit-profile {
    margin: 0;
  }

  .user-info {
    margin: 0;
  }
}
</style>
