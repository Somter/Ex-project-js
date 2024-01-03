document.addEventListener("DOMContentLoaded", function () {
    var dateDiv = document.querySelector('#today-date');
    var today = new Date();

    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    var formattedDate = day + '.' + month + '.' + year;
    dateDiv.textContent = formattedDate;



});
document.addEventListener("DOMContentLoaded", function () {
    const apiKey = 'd77e8a80bfcc7551c3135a39d716ce92';
    let city = 'Odessa';

    const IdSityName = document.getElementById('name-city');
    const inpCity = document.getElementById('inp-city');
    const decript = document.getElementById('description-1');
    const temper = document.getElementById('temperature');
    const feelsLike = document.getElementById('main-feels_like');
    const iconw = document.getElementById('img');
    const sunrise = document.getElementById('sunrise');
    const sunset = document.getElementById('sunset');
    const duration = document.getElementById('duration');
    const hourlyWeatherElem = document.getElementById('hourly-weather');
    const nearbyNameSity = document.getElementById('nearby-first-name');
    const nearbyTempOne = document.getElementById('nearby-first-temperature');
    const nearbyNameSity2 = document.getElementById('nearby-second-name');
    const nearbyTempTwo = document.getElementById('nearby-second-temperature');
    const nearbyNameSity3 = document.getElementById('nearby-third-name');
    const nearbyTempThird = document.getElementById('nearby-third-temperature');
    const nearbyNameSity4 = document.getElementById('nearby-fourth-name');
    const nearbyTempFourth = document.getElementById('nearby-fourth-temperature');


    inpCity.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            city = inpCity.value;
            FuncWeather(city);
            fetchWeather2(city);
        }
    });

    function getCity() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;

                const geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

                fetch(geoUrl)
                    .then((response) => response.json())
                    .then((data) => {
                        city = data.name;
                        inpCity.value = city;
                        FuncWeather(city);
                        fetchWeather2(city);
                        CitiesNearby('Измаил');
                        CitiesNearby2('Киев');
                        CitiesNearby3('Херсон');
                        CitiesNearby4('Львов');
                    })
                    .catch((error) => {
                        console.error('Ошибка при получении данных о местоположении:', error);
                    });
            });
        } else {
            alert("Geolocation не поддерживается вашим браузером.");
        }
    }

    function FuncWeather(cityName) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

        fetch(url).then((response) => response.json()).then((data) => {
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const mainfeels_like = data.main.feels_like;

            decript.innerHTML = `${description}`;
            temper.innerHTML = `${temperature}°C`;
            feelsLike.innerHTML = `Real feel ${data.main.feels_like}°`;
            sunrise.innerHTML = `Pressure: ${data.main.pressure} hPA`;
            sunset.innerHTML = `Humidity: ${data.main.humidity}%`;
            duration.innerHTML = `Wind gust: ${data.wind.gust} meter/sec`;
            IdSityName.innerHTML = `${city}`;

            iconw.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;


            //weatherElement3.innerHTML = `${mainfeels_like}`;
        }).catch((error) => {
            console.error('Произошла ошибка:', error);
        });
    }

    function fetchWeather2(cityName) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                for (let i = 2; i <= 42; i++) {
                    const gridItem = document.getElementById(`grid_item_${i}`);
                    if (i >= 2 && i <= 7) {
                        gridItem.textContent = `${data.list[i - 2].dt_txt.slice(11, 16)} h`;
                    } else if (i >= 9 && i <= 14) {
                        gridItem.querySelector('img').src = `https://openweathermap.org/img/wn/${data.list[i - 9].weather[0].icon}.png`;
                    } else if (i >= 16 && i <= 21) {
                        gridItem.textContent = `${data.list[i - 16].weather[0].main}`;
                    } else if (i >= 23 && i <= 28) {
                        gridItem.textContent = `${data.list[i - 23].main.temp}°`;
                    } else if (i >= 30 && i <= 35) {
                        gridItem.textContent = `${data.list[i - 30].main.feels_like}°`;
                    } else if (i >= 37 && i <= 42) {
                        gridItem.textContent = `${data.list[i - 37].wind.speed} m/s`;
                    }
                }
            })
            .catch((error) => {
                console.error('Произошла ошибка:', error);
            });
    }

    function CitiesNearby(cityName) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                nearbyNameSity.innerHTML = `${cityName}`;
                const nearbyFirstPhoto = document.getElementById('nearby-first-photo');
                const nearbyFirstBlock = document.getElementById('nearby-first-block');
                const iconCode = data.list[0].weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

                nearbyFirstPhoto.src = iconUrl;

                const temperature2 = data.list[0].main.temp;
                nearbyTempOne.innerHTML = `${temperature2}°C`;



            })
            .catch((error) => {
                console.error('Произошла ошибка:', error);
            });
    }
    function CitiesNearby2(cityName) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                nearbyNameSity2.innerHTML = `${cityName}`;
                const nearbySecondtPhoto = document.getElementById('nearby-second-photo');
                const nearbySecondBlock = document.getElementById('nearby-second-block');
                const iconCode = data.list[0].weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

                nearbySecondtPhoto.src = iconUrl;

                const temperature3 = data.list[0].main.temp;
                nearbyTempTwo.innerHTML = `${temperature3}°C`;



            })
            .catch((error) => {
                console.error('Произошла ошибка:', error);
            });
    }
    function CitiesNearby3(cityName) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                nearbyNameSity3.innerHTML = `${cityName}`;
                const nearbyThirdtPhoto = document.getElementById('nearby-third-photo');
                const nearbyThirdBlock = document.getElementById('nearby-third-block');
                const iconCode = data.list[0].weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

                nearbyThirdtPhoto.src = iconUrl;

                const temperature4 = data.list[0].main.temp;
                nearbyTempThird.innerHTML = `${temperature4}°C`;



            })
            .catch((error) => {
                console.error('Произошла ошибка:', error);
            });
    }

    function CitiesNearby4(cityName) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                nearbyNameSity4.innerHTML = `${cityName}`;
                const nearbyFourthPhoto = document.getElementById('nearby-fourth-photo');
                const nearbyFourthlock = document.getElementById('nearby-fourth-block');
                const iconCode = data.list[0].weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

                nearbyFourthPhoto.src = iconUrl;

                const temperature5 = data.list[0].main.temp;
                nearbyTempFourth.innerHTML = `${temperature5}°C`;



            })
            .catch((error) => {
                console.error('Произошла ошибка:', error);
            });
    }

    getCity();
    //fetchWeather2(city); 
    $("#button2").click(function () { $(".main-block").fadeOut(1000) });
    

});
