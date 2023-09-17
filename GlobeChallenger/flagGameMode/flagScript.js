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
    
    const skippedCountryNameSpan = document.getElementById('skipped-country-name');
    
    skippedCountryNameSpan.textContent = skippedCountryName;
    
    skippedCountryDiv.style.opacity = '1';
    skippedCountryDiv.style.display = 'block';
    
    if (skipTimeout) {
        clearTimeout(skipTimeout);
    }
    
    // Clear any existing fade-out animations
    skippedCountryDiv.style.transition = '';
    
    skipTimeout = setTimeout(() => {
        skippedCountryDiv.style.transition = 'opacity 1s ease-in-out';
        skippedCountryDiv.style.opacity = '0';
        
        skippedCountryDiv.addEventListener('transitionend', () => {
            skippedCountryDiv.style.display = 'none';
            skippedCountryDiv.style.transition = '';
        }, { once: true });
    }, 2000);
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
        document.getElementById('end-game-div').style.border = '6px solid #00ff15';
    }
    if (skippedFlag) {
        document.getElementById('end-game-div').style.boxShadow = '0px 0px 20px #ffe600';
        document.getElementById('end-game-text').innerHTML = 'You tried!';
        var pointText = (points === 1) ? 'country' : 'countries';
        document.getElementById('end-game-answer').innerHTML = 'You guessed <span style="color: #ffe600; text-shadow: 0 0 7px #ffe600;">' + points + ' ' + pointText + '</span> correctly.';
        document.getElementById('end-game-text').style.color = '#ffe600';
        document.getElementById('end-game-text').style.textShadow = '0px 0px 7px #ffe600';
        document.getElementById('end-game-div').style.border = '6px solid #ffe600';
    }    
    if (incorrectGuessCount >= 3){
        document.getElementById('end-game-div').style.boxShadow = '0px 0px 20px #fd0000';
        document.getElementById('end-game-text').innerHTML = 'You lost!';
        document.getElementById('end-game-answer').innerHTML = 'You ran out of <span style="color: #fd0000; text-shadow: 0 0 7px #fd0000;">guesses</span>. <br> The answer was <span style="color: #00ff15; text-shadow: 0 0 7px #00ff15;">' + countryName + '</span>.';
        document.getElementById('end-game-text').style.color = '#fd0000';
        document.getElementById('end-game-text').style.textShadow = '0px 0px 7px #fd0000';
        document.getElementById('end-game-div').style.border = '6px solid #fd0000';
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
        rulesDiv.style.display = "block"; // Show the element
        setTimeout(function() {
            rulesDiv.style.opacity = "1"; // Set opacity to 1 to fade in
        }, 10); // Adjust the time to match the transition duration
    } else {
        rulesDiv.style.opacity = "0"; // Set opacity to 0 to fade out
        setTimeout(function() {
            rulesDiv.style.display = "none"; // Hide the element after the fade-out
        }, 300);
    }
});

playAgain = () => {
    location.reload();
}

window.onload = () => {
    getRegion('all');
}
