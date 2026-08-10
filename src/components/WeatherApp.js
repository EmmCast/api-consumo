import React, { useState } from 'react';
import axios from 'axios';
import '../css/WeatherApp.css'

const WeatherApp = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

  const fetchWeather = async () => {
    setError('');
    setWeather(null);

    if (!latitude || !longitude) {
      setError('Por favor, ingresa latitud y longitud.');
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );

      setWeather(response.data);

    } catch (err) {
      console.error(err);

      setError(
        'Error al obtener los datos del clima.'
      );
    }
  };

  return (
    <div className="weather-container">

      <h1>
        Consulta el Clima
      </h1>

      <div className="weather-form">

        <div className="weather-field">

          <label htmlFor="latitude">
            Latitud
          </label>

          <input
            id="latitude"
            type="text"
            placeholder="Latitud"
            value={latitude}
            onChange={(e) =>
              setLatitude(e.target.value)
            }
          />

        </div>

        <div className="weather-field">

          <label htmlFor="longitude">
            Longitud
          </label>

          <input
            id="longitude"
            type="text"
            placeholder="Longitud"
            value={longitude}
            onChange={(e) =>
              setLongitude(e.target.value)
            }
          />

        </div>

        <div className="weather-button-container">

          <button
            className="weather-button"
            onClick={fetchWeather}
          >
            Consultar
          </button>

        </div>

      </div>

      {error && (
        <p className="error">
          {error}
        </p>
      )}

      {weather && (
        <div className="weather-info">

          <h2>
            Clima Actual
          </h2>

          <p>
            Temperatura: {weather.current.temp} °C
          </p>

          <p>
            Condición: {weather.current.weather[0].description}
          </p>

          <p>
            Humedad: {weather.current.humidity} %
          </p>

          <p>
            Viento: {weather.current.wind_speed} m/s
          </p>

        </div>
      )}

    </div>
  );
};

export default WeatherApp;