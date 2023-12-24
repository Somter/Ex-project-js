document.addEventListener("DOMContentLoaded", function () {
    var dateDiv = document.querySelector('#today-date');
    var today = new Date();

    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    var formattedDate = day + '.' + month + '.' + year;
    dateDiv.textContent = formattedDate;

});

window.addEventListener('DOMContentLoaded', (event) => {
    const apiKey = 'd77e8a80bfcc7551c3135a39d716ce92';
    let city = 'Odessa';

    const inpCity = document.getElementById('inp-city');
    const decript = document.getElementById('description-1');
    const temper = document.getElementById('temperature');
    const feelsLike = document.getElementById('main-feels_like');
    const iconw = document.getElementById('img');
    const sunrise = document.getElementById('sunrise');
    const sunset = document.getElementById('sunset');
    const duration = document.getElementById('duration');
    const hourlyWeatherElem = document.getElementById('hourly-weather');

    inpCity.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            city = inpCity.value;
            FuncWeather(city);
            fetchWeather2(city);
        }
    });

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

            iconw.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

            weatherElement3.innerHTML = `${mainfeels_like}`;
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
    fetchWeather2(city);    
    FuncWeather(city);


});
