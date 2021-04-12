var cityInputFormEl = document.getElementById('search-for-city');
var nameEl = document.getElementById('city');
var searchEl = document.getElementById('city-searched');
var weatherEl = document.getElementById('current-weather-container');
var forecastContainerEl = document.getElementById('fiveday-container');
var forecastTitle = document.getElementById('forecast');
var previousSearchEl = document.getElementById('previous-search'); 
var inputButton = document.getElementById('search-btn');
// Get the name of the city that the user is searching for in the search box 
var cityNames = [];

function formSumbit (event) {
    event.preventDefault();
    var city = nameEl.value.trim();
    if (city) {
        getCityWeather(city);
        getFiveDay(city);
        cityNames.unshift({city});
        nameEl.value = "";
    } else {
        alert("Enter a City please!");
    }
    saveSearch();
    recentSearch(city); 
}
var saveSearch = function(){
    localStorage.setItem("cityNames", JSON.stringify(cityNames));
};

var getCityWeather = function(city) {
    var APIKey = 'e4a1c52be376b495c4b049f65bc8f51d' 
    var apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`
    fetch(apiUrl)  
    .then(function(response) {
        response.json().then(function(data) {
            getweatherIndex 
            console.log(data)
})})}


// Establish the weather variables
function displayWeather(weather, searchCity,){
    weatherEl.textContent= "";  
    searchEl.textContent=searchCity;
 console.log(data)
    var currentDate = document.createElement("span")
    currentDate.textContent=" (" + moment().format('l')+ ") ";
    searchEl.appendChild(currentDate);
 
    var weatherImage = document.createElement("img")
    weatherImage.setAttribute("src", `https://openweathermap.org/img/wn/${weather.main[0].icon}@2x.png`);
    searchEl.appendChild(weatherImage); 

    var temperatureEl = document.createElement("span");
   temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
   temperatureEl.classList = "list-group-item"
  
   var humidityEl = document.createElement("span");
   humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
   humidityEl.classList = "list-group-item"

   var windSpeedEl = document.createElement("span");
   windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
   windSpeedEl.classList = "list-group-item"

   weatherEl.appendChild(temperatureEl);

   weatherEl.appendChild(humidityEl);

   weatherEl.appendChild(windSpeedEl);

   // Get the api to pull longitude and latitude of the city; save both longitutde and latitude as variables 
   var lat = weather.coord.lat;
   var lon = weather.coord.lon;
   getUvIndex(lat,lon)
} 

function getUvIndex (lat, lon) {
    var APIKey = 'e4a1c52be376b495c4b049f65bc8f51d'
    var APIUrl = 'https://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon  + '&appid=' + APIKey
    fetch(APIUrl) 
    .then(function(response) {
        response.json().then(function(data) {
            displayUVIndex(data)
            console.log(data)
        });
    });
} 
function getweatherIndex (lat, lon) {
    var APIKey = 'e4a1c52be376b495c4b049f65bc8f51d'
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon  + '&appid=' + APIKey
    fetch(apiUrl) 
    .then(function(response) {
        response.json().then(function(data) {
            displayWeather 
            console.log(data)
        });
    });
}
console.log(getUvIndex);
function displayUvIndex (index){
    var uvIndexEl = document.createElement("div");
    uvIndexEl.textContent = "UV Index: "
    uvIndexEl.classList = "list-group-item"
console.log(index)
    uvIndexValue = document.createElement("span")
    uvIndexValue.textContent = index.value

    if(index.value <=2){
        uvIndexValue.classList = "favorable"
    }else if(index.value >2 && index.value<=8){
        uvIndexValue.classList = "moderate "
    }
    else if(index.value >8){
        uvIndexValue.classList = "severe"
    };

    uvIndexEl.appendChild(uvIndexValue);

    weatherEl.appendChild(uvIndexEl);
}



var displayFiveDay = function(weather){
    forecastContainerEl.textContent = ""
    forecastTitle.textContent = "5 Day Forecast:";
console.log(weather)
    var forecast = weather.list;
        for(var i=5; i < forecast.length; i=i+8){
       var dailyForecast = forecast[i];
        
       var forecastEl=document.createElement("div");
       forecastEl.classList = "card bg-primary text-light m-2";

       var forecastDate = document.createElement("h5")
       forecastDate.textContent= moment.unix(dailyForecast.dt).format("MMM D, YYYY");
       forecastDate.classList = "card-header text-center"
       forecastEl.appendChild(forecastDate);

       var weatherImage = document.createElement("img")
       weatherImage.classList = "card-body text-center";
       weatherImage.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);  

       forecastEl.appendChild(weatherImage);
       
       var forecastTempEl=document.createElement("span");
       forecastTempEl.classList = "card-body text-center";
       forecastTempEl.textContent = dailyForecast.main.temp + " °F";

        forecastEl.appendChild(forecastTempEl);

       var forecastHumEl=document.createElement("span");
       forecastHumEl.classList = "card-body text-center";
       forecastHumEl.textContent = dailyForecast.main.humidity + "  %";

       forecastEl.appendChild(forecastHumEl);

        forecastContainerEl.appendChild(forecastEl);
    }

} 
function getFiveDay (city){
    var apiKey = 'e4a1c52be376b495c4b049f65bc8f51d'
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
           displayFiveDay(data);
        });
    });
};

var recentSearch = function(recentSearch){

    recentSearchEl = document.createElement("button");
    recentSearchEl.textContent = recentSearch;
    recentSearchEl.classList = "d-flex w-100 btn-light border p-2";
    recentSearchEl.setAttribute("data-city",recentSearchEl)
    recentSearchEl.setAttribute("type", "submit");

    previousSearchEl.prepend(recentSearchEl);
}


var pastSearchHandler = function(event){
    var city = event.target.getAttribute("data-city")
    if(city){
        getCityWeather(city);
        getFiveDay(city);
    }
}

cityInputFormEl.addEventListener("submit", formSumbit);
previousSearchEl.addEventListener("click", pastSearchHandler);
inputButton.addEventListener('click', formSumbit);
// And then use the api called 'one-call api' and then supply the longitude and latitude of the city searched
// And then modify the html to match the weather 
