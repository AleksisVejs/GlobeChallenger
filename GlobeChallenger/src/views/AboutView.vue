<template>
  <div class="about">
    <div class="main-div">
      <div class="about-header">
        <h1>About</h1>
      </div>
      <p>
        <font-awesome-icon
          :icon="['fas', 'globe-americas']"
          size="sm"
          style="color: #a3ffb3; filter: drop-shadow(0 0 5px #a3ffb3)"
        />
        Welcome to Globe Challenger, a geography quiz game that challenges your
        knowledge of countries. Test your geographical knowledge with this
        educational and engaging web-based game.
      </p>
      <div class="about-list">
        <font-awesome-icon
          :icon="['fas', 'flag']"
          size="sm"
          style="color: #a3ffb3; filter: drop-shadow(0 0 5px #a3ffb3)"
        />
        Flag Game - Guess the country based on the flag.
        <font-awesome-icon
          class="icon-game-list"
          id="icon-flag-game-list"
          @click="toggleList(1)"
          :icon="['fas', listIcon1]"
          size="sm"
        />
        <ul v-if="listIcon1 === 'chevron-up'" class="about-list-down">
          <li>
            You will be presented with a flag, and your objective is to
            determine the country to which the flag belongs.
          </li>
        </ul>
      </div>
      <div class="about-list">
        <font-awesome-icon
          :icon="['fas', 'users']"
          size="sm"
          style="color: #a3ffb3; filter: drop-shadow(0 0 5px #a3ffb3)"
        />
        Population Game - Higher or Lower population.
        <font-awesome-icon
          class="icon-game-list"
          id="icon-flag-game-list"
          @click="toggleList(2)"
          :icon="['fas', listIcon2]"
          size="sm"
        />
        <ul v-if="listIcon2 === 'chevron-up'" class="about-list-down">
          <li>
            Try to figure out whether one country has a larger or smaller
            population than another.
          </li>
        </ul>
      </div>
      <div class="about-list">
        <font-awesome-icon
          :icon="['fas', 'paint-brush']"
          size="sm"
          style="color: #a3ffb3; filter: drop-shadow(0 0 5px #a3ffb3)"
        />
        Draw That Flag - Draw the flag of the country.
        <font-awesome-icon
          class="icon-game-list"
          id="icon-flag-game-list"
          @click="toggleList(3)"
          :icon="['fas', listIcon3]"
          size="sm"
        />
        <ul v-if="listIcon3 === 'chevron-up'" class="about-list-down">
          <li>
            Your task is to create a near-perfect replica of the given country's
            flag.
          </li>
        </ul>
      </div>
    </div>
  </div>
  <span id="creator">
    <font-awesome-icon
      :icon="['fas', 'person']"
      size="sm"
      style="color: #a3ffb3; filter: drop-shadow(0 0 5px #a3ffb3)"
    />
    Created by Aleksis Vējš</span
  >
</template>

<script>
export default {
  data() {
    return {
      listIcon1: "chevron-down",
      listIcon2: "chevron-down",
      listIcon3: "chevron-down",
    };
  },

  methods: {
    toggleList(list) {
      if (list === 1) {
        if (this.listIcon1 === "chevron-down") {
          this.listIcon1 = "chevron-up";
        } else {
          this.listIcon1 = "chevron-down";
        }
      } else if (list === 2) {
        if (this.listIcon2 === "chevron-down") {
          this.listIcon2 = "chevron-up";
        } else {
          this.listIcon2 = "chevron-down";
        }
      } else if (list === 3) {
        if (this.listIcon3 === "chevron-down") {
          this.listIcon3 = "chevron-up";
        } else {
          this.listIcon3 = "chevron-down";
        }
      }
    },
  },
};
</script>

<style scoped>
.about {
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

.about .main-div {
  background-color: #20202071;
  border-radius: 30px;
  box-shadow: 0px 0px 200px 0px #a3ffb3;
  padding: 50px;
  padding-top: 25px;
  border-style: solid;
  border-color: #1b1b1b;
  border: 6px solid #a3ffb3;
  text-align: center;
}

.about .main-div p {
  margin: 20px;
  margin-top: 0;
}

.about-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.about-header h1 {
  color: #a3ffb3;
  font-size: 2rem;
  text-shadow: 0 0 9px #a3ffb286;
  margin: 20px;
}

.about-list {
  border: 2px solid #a3ffb3;
  border-radius: 10px;
  padding: 10px;
  padding-left: 20px;
  text-align: left;
  margin: 10px;
}

.about-list ul {
  list-style-type: none;
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

#creator {
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 10px;
  margin-right: 20px;
  font-size: 0.8rem;
  color: #a3ffb3;
  filter: drop-shadow(0 0 5px #a3ffb3);
}
</style>
