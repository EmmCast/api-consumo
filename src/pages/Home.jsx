import React, { useState } from 'react';
import ApiMenu from '../components/ApiMenu';
import WeatherApp from '../components/WeatherApp';
import HistoricalEventsApp from '../components/HistoricalEventsApp';
import MeteorologyApp from '../components/MeteorologyApp.js'
import PokemonApp from '../components/PokemonApp';

const Home = () => {

  const [selectedApi, setSelectedApi] = useState('');

  const videoUrl =
    'https://drive.google.com/file/d/1EgB_JXxKLtCML33JWdwyCITgcwNALTv8/view?usp=sharing/preview';

  return (
    <main className="home-page">

      <section className="home-container">

        <h1 className="home-title">
          CONSUMO DE APIS
        </h1>

        <ApiMenu onSelectApi={setSelectedApi} />

        {selectedApi === '' && (
          <section className="video-section">
            <iframe
              className="presentation-video"
              src={videoUrl}
              title="Video de presentación"
              allow="autoplay"
              allowFullScreen
            />
          </section>
        )}

        {selectedApi === 'weather' && (
          <WeatherApp />
        )}

        {selectedApi === 'history' && (
          <HistoricalEventsApp />
        )}

        {selectedApi === 'climas' && (
          <MeteorologyApp/>
        )}

        {selectedApi === 'pokemon' && (
          <PokemonApp />
        )}

      </section>

    </main>
  );
};

export default Home;