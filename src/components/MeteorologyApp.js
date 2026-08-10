import React, { useState } from 'react';
import axios from 'axios';
import '../css/MeteorologyApp.css';

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
  <section className="meteorology-card">

    <h1 className="meteorology-title">
      Consulta Meteorológica
    </h1>

    <div className="meteorology-form">

      <div className="meteorology-field">
        <label htmlFor="meteorology-latitude">
          Latitud
        </label>

        <input
          id="meteorology-latitude"
          type="number"
          step="any"
          placeholder="Ej. 19.4326"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
      </div>

      <div className="meteorology-field">
        <label htmlFor="meteorology-longitude">
          Longitud
        </label>

        <input
          id="meteorology-longitude"
          type="number"
          step="any"
          placeholder="Ej. -99.1332"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
      </div>

      <button
        className="meteorology-button"
        onClick={fetchWeather}
      >
        Consultar
      </button>

    </div>

    {error && (
      <div className="meteorology-error">
        {error}
      </div>
    )}

    {weather && weather.current && (
      <div className="meteorology-result">

        <h2>Clima actual</h2>

        <p>
          <strong>Temperatura:</strong>{' '}
          {weather.current.temperature_2m} °C
        </p>

        <p>
          <strong>Humedad:</strong>{' '}
          {weather.current.relative_humidity_2m} %
        </p>

        <p>
          <strong>Velocidad del viento:</strong>{' '}
          {weather.current.wind_speed_10m} km/h
        </p>

        <p>
          <strong>Código meteorológico:</strong>{' '}
          {weather.current.weather_code}
        </p>

        <p>
          <strong>Zona horaria:</strong>{' '}
          {weather.timezone}
        </p>

      </div>
    )}

  </section>
);
};

export default MeteorologyApp;