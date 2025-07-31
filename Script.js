document.getElementById('getWeatherBtn').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value.trim();
    const resultDiv = document.getElementById('weatherResult');
    if (!city) {
        resultDiv.innerHTML = '<span style="color:red;">Please enter a city name.</span>';
        return;
    }
    resultDiv.textContent = 'Loading...';
    // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
    const apiKey = '04219066605af7742397ecadbe9a100b';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            resultDiv.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
                <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            `;
        })
        .catch(error => {
            resultDiv.innerHTML = `<span style="color:red;">${error.message}</span>`;
        });
});
