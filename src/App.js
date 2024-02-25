import './App.css';
import Search from './components/search/search';
import Currentweather from './components/current-weather/current-weather';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import { useState } from 'react';
import Forecast from './components/forecast/forecast';

function App() {
  const [currentweather, setCurrentweather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const handleOnSearchChange = (searchData) => {
  const [lat, lon ] = searchData.value.split(" ");
  const CurrentweatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
  const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

  Promise.all([CurrentweatherFetch, forecastFetch])
   .then(async (response) => {
    const weatherResponse = await response[0].json();
    const forecastResponse = await response[1].json();

    setCurrentweather({ city: searchData.label, ...weatherResponse });
    setForecast({ city: searchData.label, ...forecastResponse });
   })
   .catch((err) => console.log(err));

  };
  console.log(forecast);
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      {Currentweather && <Currentweather data={currentweather} />}
      {forecast && <Forecast data={forecast} />}

    </div>
  );
}

export default App;
