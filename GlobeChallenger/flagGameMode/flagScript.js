const countries = [];
const url = 'https://restcountries.com/v3.1/all?fields=name,flags,altSpellings,region';
const flagContainer = document.getElementById('flag-container');
const xContainer = document.getElementById('x-container');
const input = document.getElementById('country-input');
var incorrectGuessCount = 0;
var points = 0;
let countryName = '';
var wonGame = false;

let countryAltSpellings = [];

const getCountryData = async (region) => {
    try {
        const response = await fetch(url);
        const countriesData = await response.json();
        
        if (region !== 'all') {
            const filteredCountries = countriesData.filter(country => {
                return country.region.toLowerCase() === region;
            });
            countries.push(...filteredCountries);
        } else {
            countries.push(...countriesData);
        }
        
        displayCountryFlag();
    } catch (error) {
        console.error('Error fetching country data:', error);
    }
}

const getRegion = (region) => {
    countries.length = 0;
    points = 0;
    document.getElementById('points-span').innerHTML = points;
    getCountryData(region);
}

const getRandomCountry = () => {
    if (countries.length === 0) {
        console.log('All countries have been displayed.');
        return null;
    }

    const randomIndex = Math.floor(Math.random() * countries.length);

    const randomCountry = countries.splice(randomIndex, 1)[0];

    return randomCountry;
}

const displayCountryFlag = () => {
    const randomCountry = getRandomCountry();

    if (randomCountry) {
        countryName = randomCountry.name.common;
        countryAltSpellings = randomCountry.altSpellings;
        console.log(countryName);
        console.log(countryAltSpellings);
        flagContainer.innerHTML = '';
        const flag = document.createElement('img');
        flag.src = randomCountry.flags.svg;
        flagContainer.appendChild(flag);
    } else {
        points++;
        wonGame = true;
        endGame();
    }
}

const answerGuess = () => {
    const answer = input.value;
    const lowercaseCountryName = countryName.toLowerCase();
    const lowercaseAnswer = answer.toLowerCase();
    const lowercaseCountryAltSpellings = countryAltSpellings.map(spelling => spelling.toLowerCase());
    
    if (lowercaseAnswer === lowercaseCountryName || lowercaseCountryAltSpellings.includes(lowercaseAnswer)) {
        input.value = '';
        displayCountryFlag();
        points++;
        document.getElementById('points-span').innerHTML = points;
    } else {
        input.value = '';
        wrongGuess();
    }
};

const wrongGuess = () => {
    incorrectGuessCount++;

    if (incorrectGuessCount === 1) {
        xContainer.innerHTML = '<img src="./images/x.png"/>';
    } else if (incorrectGuessCount === 2) {
        xContainer.innerHTML = '<img src="./images/x2.png"/>';
    }
    else if (incorrectGuessCount >= 3) {
        xContainer.innerHTML = '<img src="./images/x3.png"/>';
        endGame();
    }

    xContainer.style.display = 'block';

    setTimeout(() => {
        xContainer.style.display = 'none';
    }, 1000);
}

const endGame = () => {
    document.getElementById('main-div').style.display = 'none';
    document.getElementById('end-game-div').style.display = 'grid';
    document.getElementById('final-score-span').innerHTML = points;

    if (wonGame) {
        document.getElementById('end-game-text').innerHTML = 'You won!';
        document.getElementById('end-game-answer').innerHTML = 'You correctly guessed all the countries in the region.';
        document.getElementById('end-game-text').style.color = 'green';
        document.getElementById('end-game-text').style.textShadow = '0px 0px 7px #00ff003a';
    } else {
        document.getElementById('end-game-text').innerHTML = 'You lost!';
        document.getElementById('end-game-answer').innerHTML = 'The answer was ' + countryName + '.';
        document.getElementById('end-game-text').style.color = 'red';
        document.getElementById('end-game-text').style.textShadow = '0px 0px 7px #f700003a';
    }
}

document.getElementById("country-input").addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        answerGuess();
    }
});

document.getElementById("rules").addEventListener("click", function() {
    var rulesDiv = document.getElementById("rules-div");
    if (rulesDiv.style.display === "none" || rulesDiv.style.display === "") {
        rulesDiv.style.display = "block";
    } else {
        rulesDiv.style.display = "none";
    }
});

playAgain = () => {
    location.reload();
}

window.onload = () => {
    getRegion('all');
}
