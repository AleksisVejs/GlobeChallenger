const countries = [];
const url = 'https://restcountries.com/v3.1/independent?status=true&fields=name,flags,altSpellings,region';
const flagContainer = document.getElementById('flag-container');
const xContainer = document.getElementById('x-container');
const input = document.getElementById('country-input');
const countriesLeft = document.getElementById('countries-left-span');
const skippedCountryDiv = document.getElementById('skipped-country');
var incorrectGuessCount = 0;
var points = 0;
let countryName = '';
var wonGame = false;
var skippedFlag = false;
let countryAltSpellings = [];
let skipTimeout;

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
    incorrectGuessCount = 0;
    points = 0;
    countries.length = 0;
    wonGame = false;
    skippedFlag = false;
    xContainer.innerHTML = '';
    skippedCountryDiv.style.display = 'none';
    document.getElementById('points-span').innerHTML = points;
    getCountryData(region);
}

const getRandomCountry = () => {
    if (countries.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(Math.random() * countries.length);

    const randomCountry = countries.splice(randomIndex, 1)[0];

    return randomCountry;
}

const displayCountryFlag = () => {
    const randomCountry = getRandomCountry();

    if (randomCountry) {
        countriesLeft.innerHTML = countries.length;
        countryName = randomCountry.name.common;
        countryAltSpellings = randomCountry.altSpellings;
        console.log(countryName);
        console.log(countryAltSpellings);
        flagContainer.innerHTML = '';
        const flag = document.createElement('img');
        flag.src = randomCountry.flags.svg;
        flagContainer.appendChild(flag);
    } else {
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
        points++;
        document.getElementById('points-span').innerHTML = points;
        displayCountryFlag();
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

const skipFlag = () => {
    const skippedCountryName = countryName;
    skippedFlag = true;
    displayCountryFlag();
    
    // Update the skipped country's name in the new div
    const skippedCountryDiv = document.getElementById('skipped-country');
    const skippedCountryNameSpan = document.getElementById('skipped-country-name');
    
    skippedCountryNameSpan.textContent = skippedCountryName;
    skippedCountryDiv.style.display = 'block';
    
    // Cancel the previous timer, if any
    if (skipTimeout) {
        clearTimeout(skipTimeout);
    }
    
    // Hide the skipped country div after 3 seconds (adjust the delay as needed)
    skipTimeout = setTimeout(() => {
        skippedCountryDiv.style.display = 'none';
    }, 3000); // 3000 milliseconds (3 seconds)
}


const endGame = () => {
    document.getElementById('main-div').style.display = 'none';
    document.getElementById('end-game-div').style.display = 'grid';
    document.getElementById('final-score-span').innerHTML = points;

    if (wonGame && !skippedFlag) {
        document.getElementById('end-game-div').style.boxShadow = '0px 0px 20px #00ff15';
        document.getElementById('end-game-text').innerHTML = 'You won!';
        document.getElementById('end-game-answer').innerHTML = 'You correctly guessed <span style="color: #00ff15; text-shadow: 0 0 7px #00ff15;">all the countries</span> in the region.';
        document.getElementById('end-game-text').style.color = '#00ff15';
        document.getElementById('end-game-text').style.textShadow = '0px 0px 7px #00ff15';
    }
    if (skippedFlag) {
        document.getElementById('end-game-div').style.boxShadow = '0px 0px 20px #ffe600';
        document.getElementById('end-game-text').innerHTML = 'You tried!';
        var pointText = (points === 1) ? 'country' : 'countries';
        document.getElementById('end-game-answer').innerHTML = 'You guessed <span style="color: #ffe600; text-shadow: 0 0 7px #ffe600;">' + points + ' ' + pointText + '</span> correctly.';
        document.getElementById('end-game-text').style.color = '#ffe600';
        document.getElementById('end-game-text').style.textShadow = '0px 0px 7px #ffe600';
    }    
    if (incorrectGuessCount >= 3){
        document.getElementById('end-game-div').style.boxShadow = '0px 0px 20px #fd0000';
        document.getElementById('end-game-text').innerHTML = 'You lost!';
        document.getElementById('end-game-answer').innerHTML = 'You ran out of <span style="color: #fd0000; text-shadow: 0 0 7px #fd0000;">guesses</span>. <br> The answer was <span style="color: #00ff15; text-shadow: 0 0 7px #00ff15;">' + countryName + '</span>.';
        document.getElementById('end-game-text').style.color = '#fd0000';
        document.getElementById('end-game-text').style.textShadow = '0px 0px 7px #fd0000';
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
