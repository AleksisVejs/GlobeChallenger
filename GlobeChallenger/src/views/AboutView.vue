<template>
  <div class="about">
    <div class="about-main-div">
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
      <div class="about-list" v-for="(list, index) in lists" :key="index">
        <div @click="toggleList(index)">
          <font-awesome-icon
            :icon="['fas', list.icon]"
            size="sm"
            style="color: #a3ffb3; filter: drop-shadow(0 0 5px #a3ffb3)"
          />
          {{ list.title }}
          <font-awesome-icon
            class="icon-game-list"
            :icon="['fas', list.isOpen ? 'chevron-up' : 'chevron-down']"
            size="sm"
          />
        </div>
        <transition name="slide">
          <ul v-if="list.isOpen" class="about-list-down">
            <li>{{ list.description }}</li>
          </ul>
        </transition>
      </div>
    </div>
  </div>
  <span id="creator">
    <font-awesome-icon
      :icon="['fas', 'person']"
      size="sm"
      style="color: #a3ffb3; filter: drop-shadow(0 0 5px #a3ffb3)"
    />
    Created by Aleksis Vējš
  </span>
</template>

<script>
export default {
  data() {
    return {
      lists: [
        {
          title: "Flag Game - Guess the country based on the flag.",
          icon: "flag",
          description:
            "You will be presented with a flag, and your objective is to determine the country to which the flag belongs.",
          isOpen: false,
        },
        {
          title: "Population Game - Higher or Lower population.",
          icon: "users",
          description:
            "Try to figure out whether one country has a larger or smaller population than another.",
          isOpen: false,
        },
        {
          title: "Draw That Flag - Draw the flag of the country.",
          icon: "paint-brush",
          description:
            "Your task is to create a near-perfect replica of the given country's flag.",
          isOpen: false,
        },
      ],
    };
  },

  methods: {
    toggleList(index) {
      this.lists[index].isOpen = !this.lists[index].isOpen;
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

.about-main-div {
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

.slide-enter-active {
  animation: slide-in 0.5s ease-out forwards;
}

.slide-leave-active {
  animation: slide-out 0.5s ease-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateY(-80%);
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
    transform: translateY(-80%);
  }
}
</style>
