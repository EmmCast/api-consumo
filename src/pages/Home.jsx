import React, { useState } from "react";

import ApiMenu from "../components/ApiMenu";
import WeatherApp from "../components/WeatherApp";
import HistoricalEventsApp from "../components/HistoricalEventsApp";
import MeteorologyApp from "../components/MeteorologyApp";
import PokemonApp from "../components/PokemonApp";
import GasStationsApp from "../components/GasStationsApp";

const Home = () => {
  const [selectedApi, setSelectedApi] = useState("home");

  const videoUrl =
    "https://drive.google.com/file/d/1S8OH_Uy1FQsIePpNnN6ofZHuNcySG3ME/preview";

  return (
    <main className="home-page">
      <section className="home-container">
        <h1 className="home-title">CONSUMO DE APIS</h1>

        <ApiMenu selectedApi={selectedApi} onSelectApi={setSelectedApi} />

        {selectedApi === "home" && (
          <section className="presentation-card">
            <h2>Video de presentación</h2>

            <div className="video-section">
              <iframe
                className="presentation-video"
                src={videoUrl}
                title="Video de presentación"
                allow="autoplay"
                allowFullScreen
              />
            </div>

            <div className="video-chapters">
              <h3>Contenido del video</h3>

              <div className="chapter-item">
                <span className="chapter-time">00:00</span>
                <span>Presentación del proyecto</span>
              </div>

              <div className="chapter-item">
                <span className="chapter-time">01:15</span>
                <span>Instalación y creación del proyecto</span>
              </div>

              <div className="chapter-item">
                <span className="chapter-time">03:50</span>
                <span>Creación del menú principal</span>
              </div>

              <div className="chapter-item">
                <span className="chapter-time">07:30</span>
                <span>Consumo de API de clima</span>
              </div>

              <div className="chapter-item">
                <span className="chapter-time">10:20</span>
                <span>Consulta de efemérides</span>
              </div>

              <div className="chapter-item">
                <span className="chapter-time">13:40</span>
                <span>Consulta meteorológica</span>
              </div>

              <div className="chapter-item">
                <span className="chapter-time">16:00</span>
                <span>Consulta Pokédex</span>
              </div>
            </div>
          </section>
        )}

        {selectedApi === "weather" && <WeatherApp />}

        {selectedApi === "history" && <HistoricalEventsApp />}

        {selectedApi === "climas" && <MeteorologyApp />}

        {selectedApi === "pokemon" && <PokemonApp />}

        {selectedApi === "gasolineras" && <GasStationsApp />}
      </section>
    </main>
  );
};

export default Home;
