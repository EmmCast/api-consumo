import React, { useState } from 'react';
import axios from 'axios';

const MeteorologyApp = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    setError('');
    setWeather(null);

    if (!latitude || !longitude) {
      setError('Por favor, ingresa latitud y longitud.');
      return;
    }

    try {
      const response = await axios.get(
        'https://api.open-meteo.com/v1/forecast',
        {
          params: {
            latitude: latitude,
            longitude: longitude,
            current:
              'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
            timezone: 'auto'
          }
        }
      );

      setWeather(response.data);
    } catch (err) {
      console.error(err);
      setError('Error al obtener los datos del clima.');
    }
  };

  return (
    <div className="weather-container">

      <h1>Consulta el Clima</h1>

      <div className="weather-form">

        <input
          type="number"
          step="any"
          placeholder="Latitud"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />

        <input
          type="number"
          step="any"
          placeholder="Longitud"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />

        <button onClick={fetchWeather}>
          Consultar
        </button>

      </div>

      {error && (
        <p className="error">
          {error}
        </p>
      )}

      {weather && weather.current && (
        <div className="weather-info">

          <h2>Clima Actual</h2>

          <p>
            Temperatura:
            {' '}
            {weather.current.temperature_2m} °C
          </p>

          <p>
            Humedad:
            {' '}
            {weather.current.relative_humidity_2m} %
          </p>

          <p>
            Velocidad del viento:
            {' '}
            {weather.current.wind_speed_10m} km/h
          </p>

          <p>
            Código meteorológico:
            {' '}
            {weather.current.weather_code}
          </p>

          <p>
            Zona horaria:
            {' '}
            {weather.timezone}
          </p>

        </div>
      )}

    </div>
  );
};

export default MeteorologyApp;