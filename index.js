// Selecting the DOM element with class 'container' and storing it in the variable 'container'
const container = document.querySelector('.container');

// Selecting the DOM element with class 'search-box button' and storing it in the variable 'search'
const search = document.querySelector('.search-box button');

// Selecting the DOM element with class 'weather-box' and storing it in the variable 'weatherBox'
const weatherBox = document.querySelector('.weather-box');

// Selecting the DOM element with class 'weather-details' and storing it in the variable 'weatherDetails'
const weatherDetails = document.querySelector('.weather-details');

// Selecting the DOM element with class 'not-found' and storing it in the variable 'error404'
const error404 = document.querySelector('.not-found');

// Adding an event listener to the 'search' button for a click event
search.addEventListener('click', () => {

    // Storing the OpenWeatherMap API key in the variable 'APIKey'
    const APIKey = '276fa9dd0dd227f87353c99f548d17dd';

    // Retrieving the value entered in the input field with class 'search-box input' and storing it in the variable 'city'
    const city = document.querySelector('.search-box input').value;

    // Checking if the input field is empty, if so, return early
    if (city === '')
        return;

    // Fetching weather data from OpenWeatherMap API based on the entered city
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json()) // Parsing the response as JSON
        .then(json => {

            // Checking if the response indicates a city not found error (404)
            if (json.cod === '404') {
                // Adjusting styles and displaying error message if city not found
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            // Hiding error message and removing fade-in effect if not a 404 error
            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            // Selecting DOM elements for weather data display
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            // Setting weather image based on weather condition
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;
                case 'Haze':
                    image.src = 'images/mist.png';
                    break;
                default:
                    image.src = '';
            }

            // Setting temperature, description, humidity, and wind speed
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            // Displaying weather box and details, and adding fade-in effect
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        });
});
