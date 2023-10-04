<template>
  <div class="population-game">
    <div class="main-div">
      <div class="header">
        <h1 id="game-header">
          Does <span id="country-two-span">{{ countryTwo.name }}</span> have
          more people than
          <span id="country-one-span">{{ countryOne.name }}</span
          >?
        </h1>
      </div>
      <div class="countries-container">
        <img id="x-image" src="../assets/x.png" v-if="showXImage" />
        <img
          id="correct-image"
          src="../assets/correct.png"
          v-if="showCorrectImage"
        />
        <div class="country">
          <h2>{{ countryOne.name }}</h2>
          <img :src="countryOne.flag" alt="flag" />
          <h2 id="population">
            <font-awesome-icon icon="users" /> Population:
            {{ formattedPopulationOne }}
          </h2>
        </div>
        <div class="country">
          <h2>{{ countryTwo.name }}</h2>
          <img :src="countryTwo.flag" alt="flag" />
          <div v-if="!countingAnimationInProgress" class="button-div">
            <button id="button-guess" @click="startCountingAnimation('higher')">
              <font-awesome-icon icon="arrow-up" />
              Higher
            </button>
            <button id="button-guess" @click="startCountingAnimation('lower')">
              <font-awesome-icon icon="arrow-down" />
              Lower
            </button>
          </div>
          <div v-else>
            <h2 id="population">
              <font-awesome-icon icon="users" /> Population:
              {{ currentPopulation }}
            </h2>
          </div>
        </div>
      </div>
      <h2 id="points-text">Points: {{ points }}</h2>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PopulationGameView",
  data() {
    return {
      countries: [],
      countryOne: { name: "", population: 0, flag: "" },
      countryTwo: { name: "", population: 0, flag: "" },
      points: 0,
      countingAnimationInProgress: false,
      showButtons: true,
      currentPopulation: 0,
      tempCountry: {},
      showXImage: false,
      showCorrectImage: false,
      currentlyOnPage: true,
    };
  },
  computed: {
    formattedPopulationOne() {
      return this.formatPopulation(this.countryOne.population);
    },
    formattedPopulationTwo() {
      return this.formatPopulation(this.countryTwo.population);
    },
  },
  methods: {
    async fetchAllCountries() {
      try {
        let apiUrl = `https://restcountries.com/v3.1/independent?status=true&fields=name,flags,population,region`;
        const response = await axios.get(apiUrl);
        this.countries = response.data;
        this.fetchCountry();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    fetchCountry() {
      let randomCountryOne, randomCountryTwo;

      do {
        randomCountryOne = Math.floor(Math.random() * this.countries.length);
        randomCountryTwo = Math.floor(Math.random() * this.countries.length);
      } while (randomCountryOne === randomCountryTwo);

      this.countryTwo.name = this.countries[randomCountryTwo].name.common;
      this.countryTwo.population = this.countries[randomCountryTwo].population;
      this.countryTwo.flag = this.countries[randomCountryTwo].flags.svg;

      this.countryOne.name = this.countries[randomCountryOne].name.common;
      this.countryOne.population = this.countries[randomCountryOne].population;
      this.countryOne.flag = this.countries[randomCountryOne].flags.svg;
    },

    swapCountries() {
      this.fetchCountry();
      this.countryOne = this.tempCountry;
    },

    formatPopulation(population) {
      return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    startCountingAnimation(guess) {
      this.showButtons = false;
      this.countingAnimationInProgress = true;

      let targetPopulation = this.countryTwo.population;
      let currentPopulation = 0;
      let animationInterval = setInterval(() => {
        if (currentPopulation < targetPopulation) {
          let remainingPopulation = targetPopulation - currentPopulation;

          let stepSize = Math.max(Math.ceil(remainingPopulation / 10), 1);

          currentPopulation += stepSize;

          if (currentPopulation > targetPopulation) {
            currentPopulation = targetPopulation;
          }

          this.currentPopulation = this.formatPopulation(currentPopulation);
        } else {
          clearInterval(animationInterval);
          if (
            (guess === "higher" &&
              this.countryOne.population < this.countryTwo.population) ||
            (guess === "lower" &&
              this.countryOne.population > this.countryTwo.population)
          ) {
            this.showCorrectImage = true;
          } else {
            this.showXImage = true;
          }
          setTimeout(() => {
            this.countingAnimationInProgress = false;
            this.currentPopulation = 0;

            if (
              (guess === "higher" &&
                this.countryOne.population < this.countryTwo.population) ||
              (guess === "lower" &&
                this.countryOne.population > this.countryTwo.population)
            ) {
              this.points++;

              this.showCorrectImage = false;
              this.tempCountry = Object.assign({}, this.countryTwo);

              this.swapCountries();
            } else if (this.currentlyOnPage) {
              this.showXImage = false;
              this.$router.push({
                name: "population-result",
                query: { points: this.points },
              });
            }
          }, 3000);
        }
      }, 10);
    },
  },

  mounted() {
    this.fetchAllCountries();
  },

  unmounted() {
    this.currentlyOnPage = false;
  },
};
</script>

<style>
.population-game {
  position: relative;
  color: #f1f1f1;
  text-shadow: 0 0 7px #ffffff67;
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
  padding: 50px;
  padding-top: 25px;
  border-style: solid;
  border-color: #1b1b1b;
  border: 6px solid #a3ffb3;
  text-align: center;
}

#game-header {
  color: #ffffff;
  font-size: 1.4rem;
  margin: 0;
  margin-bottom: 20px;
}

.countries-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.country {
  width: 300px;
  height: 300px;
  background-color: #a3ffb23f;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 6px solid #a3ffb3;
  border-radius: 30px;
  padding: 20px;
  margin: 0 20px;
}

.country img {
  max-width: 250px;
  max-height: 100px;
  object-fit: cover;
}

#population {
  margin-top: 60px;
  font-size: 1.3rem;
}

#button-guess {
  width: 100px;
  margin-top: 20px;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 200;
  cursor: pointer;
}

.button-div {
  margin-top: 30px;
}

#points-text {
  margin-bottom: 0;
  margin-top: 40px;
  font-size: 1.5rem;
}

#x-image {
  width: 300px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#correct-image {
  width: 350px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#country-one-span {
  color: #a3ffb3;
  text-shadow: 0 0 7px #a3ffb3;
}

#country-two-span {
  color: #a3ffb3;
  text-shadow: 0 0 7px #a3ffb3;
}
</style>
