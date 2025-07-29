const apiKey = '839ac249d473abc49b92624d5dfebf63';

function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();
    cityInput.value = '';
    fetchWeatherData(city);
}

function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.style.display = 'block';
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;

            // Determine the image based on the weather description
            let weatherImage = '';
            if (weatherDescription.includes('clear')) {
                weatherImage = 'images/sunny.png'; // Path to your sunny image
            } else if (weatherDescription.includes('cloud')) {
                weatherImage = 'images/cloudy.png'; // Path to your cloudy image
            } else if (weatherDescription.includes('rain')) {
                weatherImage = 'images/rainy.png'; // Path to your rainy image
            } else if (weatherDescription.includes('snow')) {
                weatherImage = 'images/snowy.png'; // Path to your snowy image
            } else {
                weatherImage = 'images/default.png'; // Default image if no match
            }

            const weatherHTML = `
                <h2>Weather in ${city}</h2>
                <img src="${weatherImage}" alt="${weatherDescription}" style="width: 100px; height: auto;"/>
                <p>Description: ${weatherDescription}</p>
                <p>Temperature: ${temperature} °C</p>
                <p>Humidity: ${humidity}%</p>
                <p>Stay hydrated and enjoy your day!</p>`;
            weatherInfo.innerHTML = weatherHTML;
        })
        .catch(error => {
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.style.display = 'none';
            alert('Weather data not found for the given city.');
            console.error('Error fetching weather data:', error);
        });
}
