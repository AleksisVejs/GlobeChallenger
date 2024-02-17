<template>
  <div class="capital-game">
    <div class="capital-main-div">
      <div class="capital-header">
        <h1 id="game-header">
          What country has the capital city of
          <span id="capital-span">{{ capital }}</span> ?
          <h2>Points: {{ points }}</h2>
        </h1>
      </div>
      <div class="country-choices">
        <div class="capital-country">
          <button
            :class="buttonClass[0]"
            @click="checkAnswer(countryOne.capital, 0)"
          >
            <h2>{{ countryOne.name }}</h2>
          </button>
        </div>
        <div class="capital-country">
          <button
            :class="buttonClass[1]"
            @click="checkAnswer(countryTwo.capital, 1)"
          >
            <h2>{{ countryTwo.name }}</h2>
          </button>
        </div>
        <div class="capital-country">
          <button
            :class="buttonClass[2]"
            @click="checkAnswer(countryThree.capital, 2)"
          >
            <h2>{{ countryThree.name }}</h2>
          </button>
        </div>
        <div class="capital-country">
          <button
            :class="buttonClass[3]"
            @click="checkAnswer(countryFour.capital, 3)"
          >
            <h2>{{ countryFour.name }}</h2>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CapitalGameView",
  data() {
    return {
      countries: [],
      capital: "",
      countryOne: { name: "", capital: "" },
      countryTwo: { name: "", capital: "" },
      countryThree: { name: "", capital: "" },
      countryFour: { name: "", capital: "" },
      points: 0,
      buttonClass: ["", "", "", ""],
      gameId: 3,
    };
  },
  methods: {
    async fetchAllCountries() {
      try {
        let apiUrl =
          "https://restcountries.com/v3.1/independent?status=true&fields=name,capital";
        const response = await axios.get(apiUrl);
        this.countries = response.data;
        this.fetchCountry();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    fetchCountry() {
      let randomCountryOne,
        randomCountryTwo,
        randomCountryThree,
        randomCountryFour;

      do {
        randomCountryOne = Math.floor(Math.random() * this.countries.length);
        randomCountryTwo = Math.floor(Math.random() * this.countries.length);
        randomCountryThree = Math.floor(Math.random() * this.countries.length);
        randomCountryFour = Math.floor(Math.random() * this.countries.length);
      } while (
        randomCountryOne === randomCountryTwo ||
        randomCountryOne === randomCountryThree ||
        randomCountryOne === randomCountryFour ||
        randomCountryTwo === randomCountryThree ||
        randomCountryTwo === randomCountryFour ||
        randomCountryThree === randomCountryFour
      );

      this.countryOne.name = this.countries[randomCountryOne].name.common;
      this.countryOne.capital = this.countries[randomCountryOne].capital[0];

      this.countryTwo.name = this.countries[randomCountryTwo].name.common;
      this.countryTwo.capital = this.countries[randomCountryTwo].capital[0];

      this.countryThree.name = this.countries[randomCountryThree].name.common;
      this.countryThree.capital = this.countries[randomCountryThree].capital[0];

      this.countryFour.name = this.countries[randomCountryFour].name.common;
      this.countryFour.capital = this.countries[randomCountryFour].capital[0];

      let randomCapital = Math.floor(Math.random() * 4);
      if (randomCapital === 0) {
        this.capital = this.countryOne.capital;
      } else if (randomCapital === 1) {
        this.capital = this.countryTwo.capital;
      } else if (randomCapital === 2) {
        this.capital = this.countryThree.capital;
      } else if (randomCapital === 3) {
        this.capital = this.countryFour.capital;
      }
    },

    checkAnswer(answer, index) {
      let buttons = document.querySelectorAll("button");

      buttons.forEach((button) => {
        button.disabled = true;
      });
      if (answer === this.capital) {
        this.points++;
        this.submitScore();
        this.buttonClass = ["", "", "", ""];
        this.buttonClass[index] = "green-button";
      } else {
        this.points--;
        this.buttonClass = ["", "", "", ""];
        this.buttonClass[index] = "red-button";
      }
      setTimeout(() => {
        this.buttonClass = ["", "", "", ""];
        this.fetchCountry();
        buttons.forEach((button) => {
          button.disabled = false;
        });
      }, 1000);

      if (this.points < 0) {
        this.points = 0;
        this.$router.push({ name: "game-over" });
      }
    },

    submitScore() {
      const info = {
        gameId: this.gameId,
        difficultyId: null,
        region: null,
        score: this.points,
      };
      this.$store.dispatch("updateScore", info);
    },
  },
  mounted() {
    this.fetchAllCountries();
  },
};
</script>

<style scoped>
.capital-game {
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

.capital-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.capital-header h1 {
  color: #ffffff;
  font-size: 1.7rem;
  text-shadow: 0 0 12px #ffffff;
  margin-bottom: 30px;
  margin-top: 20px;
}

.capital-header h2 {
  color: #ffffff;
  font-size: 1.3rem;
  text-shadow: 0 0 12px #ffffff;
  margin-bottom: 0;
  margin-top: 30px;
}

#capital-span {
  color: #a3ffb3;
  text-shadow: 0 0 12px #a3ffb3;
}

.capital-main-div {
  background-color: #20202071;
  border-radius: 30px;
  box-shadow: 0px 0px 100px 0px #a3ffb3;
  padding: 50px;
  padding-top: 25px;
  border-style: solid;
  border-color: #1b1b1b;
  border: 6px solid #a3ffb3;
  text-align: center;
  max-width: 900px;
  width: 100%;
}

.country-choices {
  display: block;
  justify-content: space-between;
  align-items: center;
}

.capital-country {
  display: flex;
  justify-content: center;
  align-items: center;
}

.capital-country button {
  min-width: 800px;
  min-height: 30px;
}

.red-button,
.red-button:hover {
  color: #ffffff;
  background-color: #ff2a2a;
  box-shadow: 0px 0px 10px 0px #ff2a2a;
  border: 1px solid #ff2a2a;
}

.green-button,
.green-button:hover {
  color: #ffffff;
  background-color: #00ff00;
  box-shadow: 0px 0px 10px 0px #00ff00;
  border: 1px solid #00ff00;
}

@media (max-width: 768px) {
  .capital-main-div {
    padding: 25px;
    margin-top: 70px;
    width: 250px;
    height: 450px;
  }

  .capital-header h1 {
    font-size: 1.1rem;
  }

  .capital-header h2 {
    font-size: 0.9rem;
  }

  .capital-country button {
    min-width: 250px;
    font-size: 0.7rem;
  }
}
</style>
