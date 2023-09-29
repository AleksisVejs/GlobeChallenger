<template>
  <div class="flag-game">
    <div class="main-div">
      <div class="region">
        <label for="region"></label>
        <select v-model="selectedRegion" @change="selectRegion">
          <option
            v-for="region in regions"
            :key="region.value"
            :value="region.value"
          >
            {{ region.label }}
          </option>
        </select>
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
      <button id="skip-button" @click="skipFlag">Skip</button>
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
    <EndGame v-if="wrongGuesses >= 3" :points="points" />
  </div>
</template>

<script>
import axios from "axios";
import LastCountry from "../components/LastCountry.vue";
import EndGame from "./EndGameView.vue";

export default {
  name: "FlagGameView",
  components: {
    LastCountry,
    EndGame,
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
      points: 0,
      countriesLeft: 0,
      wrongGuesses: 0,
      showXImage: false,
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

    // Filter the countries based on the selected region
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
      // Fetch all countries if the countries list is empty
      if (this.countries.length === 0) {
        await this.fetchAllCountries();
      }

      // Filter the countries based on the selected region
      const filteredCountries = this.filterCountriesByRegion();

      if (filteredCountries.length > 0) {
        // Select a random country from the filtered list
        const randomIndex = Math.floor(
          Math.random() * filteredCountries.length
        );
        const randomCountry = filteredCountries[randomIndex];

        // Update the flag and countryName values
        this.flag = randomCountry.flags.svg;
        this.countryName = randomCountry.name.common;
        this.countryAltSpellings = randomCountry.altSpellings;
        this.countriesLeft = filteredCountries.length;
      } else {
        alert("No countries left!");
      }
    },

    selectRegion() {
      // Call fetchFlag to update the countries list and select a new flag
      console.log("Selected region:", this.selectedRegion);
      this.fetchFlag();
      this.points = 0;
    },

    skipFlag() {
      this.lastCountryName = this.countryName;
      this.countries = this.countries.filter(
        (country) => country.name.common !== this.countryName
      );
      this.fetchFlag();
    },

    submitAnswer() {
      if (this.answer === "" || this.showXImage === true) {
        return;
      }

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
      } else {
        this.answer = "";
        this.wrongGuesses++;
        if (this.wrongGuesses >= 3) {
          this.$router.push("/endgame");
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

.region {
  display: flex;
  justify-content: center;
  align-items: center;
}

.region select {
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

.region select:hover {
  border: 1px solid #a3ffb3;
  background-color: #a3ffb3;
  color: #1b1b1b;
  box-shadow: 0px 0px 20px 0px #a3ffb3;
  cursor: pointer;
}

.region select option {
  background-color: #1b1b1b;
  color: rgb(255, 255, 255);
}

.flag-div {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

#flag {
  width: 500px;
  height: 300px;
  border-radius: 5px;
  transition: all 0.3s ease;
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
}

#x-image {
  width: 550px;
  height: 300px;
  position: absolute;
  z-index: 1;
}
</style>
