document.getElementById('weatherForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const country = document.getElementById('countryInput').value.trim();
    const apiKey = 'cd430a6ab1a9e979b80a0b16daeeb00d'; // Replace with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.cod === 200) {
                const weatherDescription = data.weather[0].description;
                const temperature = data.main.temp;
                const weatherResultDiv = document.getElementById('weatherResult');
                weatherResultDiv.innerHTML = `
                    <h2>Weather in ${data.name}, ${data.sys.country}</h2>
                    <p>${weatherDescription}</p>
                    <p>Temperature: ${temperature}°C</p>
                `;
                document.getElementById('error').textContent = '';
            } else {
                throw new Error('Country not found');
            }
        })
        .catch(error => {
            document.getElementById('error').textContent = error.message;
        });
});




