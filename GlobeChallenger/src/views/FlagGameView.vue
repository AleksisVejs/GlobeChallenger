<template>
  <div class="flag-game">
    <div class="flag-main-div">
      <div class="select-div">
        <label for="region"
          ><font-awesome-icon class="icon" icon="globe"
        /></label>
        <select v-model="selectedRegion">
          <option
            v-for="region in regions"
            :key="region.value"
            :value="region.value"
          >
            {{ region.label }}
          </option>
        </select>
        <select v-model="selectedMode">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <label for="mode"><font-awesome-icon class="icon" icon="cog" /></label>
      </div>
      <div id="results">
        <p id="points">
          Points: <span id="points-span">{{ points }}</span>
        </p>
        <div id="countries-left">
          <p>
            Countries Left:
            <span id="countries-left-span">{{ countriesLeft }}</span>
          </p>
        </div>
      </div>
      <div id="flag-div">
        <img id="x-image" src="../assets/x.png" v-if="showXImage" />
        <img id="flag" :src="flag" />
      </div>
      <button
        id="skip-button"
        @click="skipFlag"
        :disabled="selectedMode === 'hard'"
      >
        <font-awesome-icon icon="forward" />
        Skip
      </button>
      <div id="answerSubmit">
        <input
          @keyup.enter="submitAnswer"
          id="country-input"
          type="text"
          placeholder="Enter your answer..."
          autocomplete="off"
          v-model="answer"
        />
      </div>
    </div>
    <LastCountry v-if="lastCountryName" :countryName="lastCountryName" />
  </div>
</template>

<script>
import axios from "axios";
import LastCountry from "../components/LastCountry.vue";

export default {
  name: "FlagGameView",
  components: {
    LastCountry,
  },
  data() {
    return {
      countries: [], // List to store countries
      answer: "",
      flag: "",
      countryName: "",
      lastCountryName: "",
      countryAltSpellings: [],
      regions: [
        { value: "all", label: "All" },
        { value: "africa", label: "Africa" },
        { value: "americas", label: "Americas" },
        { value: "asia", label: "Asia" },
        { value: "europe", label: "Europe" },
        { value: "oceania", label: "Oceania" },
      ],
      selectedRegion: "all",
      selectedMode: "easy",
      points: 0,
      countriesLeft: 0,
      wrongGuesses: 0,
      showXImage: false,
      hasSkipButtonBeenClicked: false,
      modeLimits: {
        easy: Infinity,
        medium: 3,
        hard: 1,
      },
    };
  },
  methods: {
    async fetchAllCountries() {
      try {
        let apiUrl = `https://restcountries.com/v3.1/independent?status=true&fields=name,flags,altSpellings,region`;
        const response = await axios.get(apiUrl);
        this.countries = response.data;
        this.fetchFlag();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    filterCountriesByRegion() {
      if (this.selectedRegion === "all") {
        return this.countries;
      } else {
        return this.countries.filter(
          (country) => country.region.toLowerCase() === this.selectedRegion
        );
      }
    },

    async fetchFlag() {
      const filteredCountries = this.filterCountriesByRegion();

      if (filteredCountries.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * filteredCountries.length
        );
        const randomCountry = filteredCountries[randomIndex];

        this.flag = randomCountry.flags.svg;
        this.countryName = randomCountry.name.common;
        this.countryAltSpellings = randomCountry.altSpellings;
        this.countriesLeft = filteredCountries.length;
      } else {
        if (this.hasSkipButtonBeenClicked === false) {
          this.$router.push({
            name: "won-game",
            query: {
              points: this.points,
              difficulty: this.selectedMode,
              region: this.selectedRegion,
            },
          });
        } else {
          this.$router.push({
            name: "tried-game",
            query: {
              points: this.points,
              difficulty:
                this.selectedMode.charAt(0).toUpperCase() +
                this.selectedMode.slice(1),
              region:
                this.selectedRegion.charAt(0).toUpperCase() +
                this.selectedRegion.slice(1),
            },
          });
        }
      }
    },

    skipFlag() {
      this.lastCountryName = this.countryName;
      this.countries = this.countries.filter(
        (country) => country.name.common !== this.countryName
      );
      this.fetchFlag();
      this.hasSkipButtonBeenClicked = true;
    },

    submitAnswer() {
      if (this.answer === "" || this.showXImage === true) {
        return;
      }

      const mistakeLimit = this.modeLimits[this.selectedMode];

      if (
        this.answer.toLowerCase() === this.countryName.toLowerCase() ||
        this.countryAltSpellings
          .map((spelling) => spelling.toLowerCase())
          .includes(this.answer.toLowerCase())
      ) {
        this.points++;
        this.answer = "";
        this.countries = this.countries.filter(
          (country) => country.name.common !== this.countryName
        );
        this.fetchFlag();
        this.showXImage = false;
        this.lastCountryName = null;
      } else {
        this.answer = "";
        this.wrongGuesses++;
        if (this.wrongGuesses >= mistakeLimit) {
          this.$router.push({
            name: "end-game",
            query: { points: this.points, previousCountry: this.countryName },
          });
        }
        this.showXImage = true;
        setTimeout(() => {
          this.showXImage = false;
        }, 2000);
      }
    },
  },
  mounted() {
    this.fetchAllCountries();
  },
  watch: {
    selectedRegion() {
      this.fetchAllCountries();
      this.points = 0;
      this.wrongGuesses = 0;
      this.hasSkipButtonBeenClicked = false;
      this.lastCountryName = null;
    },
    selectedMode() {
      this.fetchAllCountries();
      this.points = 0;
      this.wrongGuesses = 0;
      this.hasSkipButtonBeenClicked = false;
      this.lastCountryName = null;
    },
  },
};
</script>

<style scoped>
.flag-game {
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

.flag-main-div {
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

.select-div {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.select-div select {
  width: 100px;
  background-color: transparent;
  color: rgb(255, 255, 255);
  border: 1px solid rgb(255, 255, 255);
  box-shadow: 0px 0px 7px #fff;
  text-shadow: 0px 0px 3px #fff;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  transition: all 0.3s ease;
}

.select-div select:hover {
  border: 1px solid #a3ffb3;
  background-color: #a3ffb3;
  color: #1b1b1b;
  box-shadow: 0px 0px 20px 0px #a3ffb3;
  cursor: pointer;
}

.select-div select option {
  background-color: #1b1b1b;
  color: rgb(255, 255, 255);
}

#flag-div {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

#flag {
  width: 500px;
  height: 300px;
  -webkit-user-drag: none;
}

#answerSubmit {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

input {
  width: 300px;
  background-color: transparent;
  color: rgb(255, 255, 255);
  border: 1px solid rgb(255, 255, 255);
  box-shadow: 0px 0px 7px #fff;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
}

input:focus {
  border: 1px solid #a3ffb3;
  background-color: #a3ffb3;
  color: #1b1b1b;
  box-shadow: 0px 0px 20px 0px #a3ffb3;
  outline: none;
  transition: all 0.3s ease;
}

#skip-button {
  width: 100px;
  margin-top: 16px;
  margin-bottom: 16px;
  transition: all 0.3s ease;
}

#skip-button:disabled {
  filter: blur(2px);
  opacity: 0.5;
  pointer-events: none;
}

#x-image {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 400px;
  height: 400px;
}

.icon {
  color: #ffffff;
  filter: drop-shadow(0 0 3px #ffffff);
  transition: all 0.3s;
}
</style>
