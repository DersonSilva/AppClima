const apikey = "d4d992d4ce5cffc4a9ab885d35d1a979";
const apiCountryURL = "";
const apiUnsplash = "https://source.unsplash.com/1920x1080/?";

// {"coord":{"lon":10.99,"lat":44.34},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"base":"stations","main":{"temp":288.86,"feels_like":288.78,"temp_min":285.56,"temp_max":292.59,"pressure":1014,"humidity":88,"sea_level":1014,"grnd_level":930},"visibility":10000,"wind":{"speed":1.22,"deg":116,"gust":1.59},"clouds":{"all":91},"dt":1685812526,"sys":{"type":2,"id":2075663,"country":"IT","sunrise":1685763265,"sunset":1685818450},"timezone":7200,"id":3163858,"name":"Zocca","cod":200}

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

const getWeatherData = async(city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;
}


const showWeatherData = async (city) => {

   const data = await getWeatherData(city);

   cityElement.innerText = data.name;
   tempElement.innerText = parseInt(data.main.temp);
   descElement.innerText = data.weather[0].description;
   weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);

  countryElement.setAttribute("src", apiCountryURL + data.sys.country); 
  humidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed}km/h`;

  document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

  weatherContainer.classList.remove("hide");

};

searchBtn.addEventListener("click", async (e) => {
 e.preventDefault();

 const city = cityInput.value;
 showWeatherData(city);

});

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;

        showWeatherData(city);
    }

});

