import React, { useState } from 'react';
import { FaTemperatureHigh, FaTemperatureLow } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi';
const api = {
  key: "f3f25e406a03349031cc25ed16a8196d",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');


  const search = evt => {

    if (evt.key === "Enter") {
      //query api
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          console.clear(); //clears the console not found error if the user types something wrong
          console.log(result);
          setQuery('');
        })
     }
  }

  const dateBuilder = (d) => {
    //months and days arrays
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    //defition of date variaveis
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date}, ${month} ${year}`
  }

  return (
    //Background change
    <div className={
      (typeof weather.main != "undefined") ?
        ((weather.main.temp > 16) ?
          'app warm'
          : 'app')
        : 'app'
    }>

      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search for a city..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>

            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}ºC</div>
              <div className="min_max">
                <div className="temp_min">
                <FaTemperatureLow color='#D2F0E3' size={24}/>{Math.round(weather.main.temp_min)}
                </div>
                <div className="temp_max">
                <FaTemperatureHigh color='#bb2847' size={24}/>{Math.round(weather.main.temp_max)}
                </div>
              </div>
              <div className="humidity">
                <WiHumidity color='#fff' size={34}/>{weather.main.humidity}
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
            <div className="location-box">
              <div className="location">Nothing here...</div>
            </div>
          )}
      </main>
    </div>
  );
}

export default App;
