const apiKey = "a1072562a92b15b5ef4383e1e7bb95d2";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");
const city = document.getElementById("city");
const country = document.getElementById("country");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const pressure = document.getElementById("pressure");
const weatherIcon = document.getElementById("weatherIcon");

searchButton.addEventListener("click", () => {
    const cityName = cityInput.value;
    if (cityName === "") return;
    getWeatherData(cityName);
});

const getWeatherData = async (cityName) => {
    const url = `${apiUrl}appid=${apiKey}&q=${cityName}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            updateWeatherUI(data);
        } else {
            console.error("Error fetching data:", response.status);
            alert("City not found. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    }
};

const updateWeatherUI = (data) => {
    city.textContent = data.name;
    country.textContent = data.sys.country;
    temperature.textContent = Math.round(data.main.temp - 273.15);
    description.textContent = data.weather[0].description;
    humidity.textContent = data.main.humidity + "% ";
    windSpeed.textContent = data.wind.speed + "m/s ";
    pressure.textContent = data.main.pressure + "hPa ";
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png `;
};
