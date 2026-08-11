import React, { useState } from "react";

import ApiMenu from "../components/ApiMenu";
import WeatherApp from "../components/WeatherApp";
import HistoricalEventsApp from "../components/HistoricalEventsApp";
import MeteorologyApp from "../components/MeteorologyApp";
import PokemonApp from "../components/PokemonApp";
import GasStationsApp from "../components/GasStationsApp";

const Home = () => {
  const [selectedApi, setSelectedApi] = useState("home");

  const [videoStart, setVideoStart] = useState(0);

  const videoBaseUrl = "https://www.youtube.com/embed/kdSlj8_Empo";

  const videoUrl = `${videoBaseUrl}?start=${videoStart}&autoplay=1`;

  const goToChapter = (seconds) => {
    setVideoStart(seconds);

    setTimeout(() => {
      document.querySelector(".video-section")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  return (
    <main className="home-page">
      <section className="home-container">
        <h1 className="home-title">CONSUMO DE APIS</h1>

        <ApiMenu selectedApi={selectedApi} onSelectApi={setSelectedApi} />

        {/* PÁGINA PRINCIPAL */}

        {selectedApi === "home" && (
          <section className="presentation-card">
            <h2>Video de presentación</h2>

            <div className="video-section">
              <iframe
                key={videoStart}
                className="presentation-video"
                src={videoUrl}
                title="Video de presentación"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="video-chapters">
              <h3>Contenido del video</h3>

              {/* 00:01 */}

              <div
                className="chapter-item chapter-clickable"
                onClick={() => goToChapter(0)}
              >
                <span className="chapter-time">00:00</span>

                <span className="chapter-title">Presentación del proyecto</span>
              </div>

              {/* 01:00 */}

              <div
                className="chapter-item chapter-clickable"
                onClick={() => goToChapter(60)}
              >
                <span className="chapter-time">01:00</span>

                <span className="chapter-title">
                  Creación y configuración del proyecto en React
                </span>
              </div>

              {/* 08:00 */}

              <div
                className="chapter-item chapter-clickable"
                onClick={() => goToChapter(480)}
              >
                <span className="chapter-time">08:00</span>

                <span className="chapter-title">
                  Estructura del proyecto y componentes de React
                </span>
              </div>

              {/* 12:00 */}

              <div
                className="chapter-item chapter-clickable"
                onClick={() => goToChapter(720)}
              >
                <span className="chapter-time">12:00</span>

                <span className="chapter-title">
                  Menú de navegación y página principal
                </span>
              </div>

              {/* 16:00 */}

              <div
                className="chapter-item chapter-clickable"
                onClick={() => goToChapter(960)}
              >
                <span className="chapter-time">16:00</span>

                <span className="chapter-title">
                  Consumo de API de clima con OpenWeather
                </span>
              </div>

              {/* 22:00 */}

              <div
                className="chapter-item chapter-clickable"
                onClick={() => goToChapter(1320)}
              >
                <span className="chapter-time">22:00</span>

                <span className="chapter-title">
                  Pruebas de la API de clima
                </span>
              </div>

              {/* 26:40 */}

              <div
                className="chapter-item chapter-clickable"
                onClick={() => goToChapter(1600)}
              >
                <span className="chapter-time">26:40</span>

                <span className="chapter-title">
                  Consumo de API de Efemérides
                </span>
              </div>

              {/* 28:00 */}

              <div
                className="chapter-item chapter-clickable"
                onClick={() => goToChapter(1680)}
              >
                <span className="chapter-time">28:00</span>

                <span className="chapter-title">
                  Consumo de API Meteorológica con Open-Meteo
                </span>
              </div>

              {/* 29:00 */}

              <div
                className="chapter-item chapter-clickable"
                onClick={() => goToChapter(1740)}
              >
                <span className="chapter-time">29:00</span>

                <span className="chapter-title">
                  Consumo de PokéAPI y consulta de Pokédex
                </span>
              </div>

              {/* 30:00 */}

              <div
                className="chapter-item chapter-clickable"
                onClick={() => goToChapter(1800)}
              >
                <span className="chapter-time">30:00</span>

                <span className="chapter-title">
                  Traducción de efemérides con MyMemory
                </span>
              </div>

              {/* 34:00 */}

              <div
                className="chapter-item chapter-clickable"
                onClick={() => goToChapter(2040)}
              >
                <span className="chapter-time">34:00</span>

                <span className="chapter-title">
                  Pruebas de las APIs y funcionamiento de la aplicación
                </span>
              </div>

              {/* 36:00 */}

              <div
                className="chapter-item chapter-clickable"
                onClick={() => goToChapter(2160)}
              >
                <span className="chapter-time">36:00</span>

                <span className="chapter-title">
                  Integración de la API de Gasolineras México
                </span>
              </div>

              {/* 38:00 */}

              <div
                className="chapter-item chapter-clickable"
                onClick={() => goToChapter(2280)}
              >
                <span className="chapter-time">38:00</span>

                <span className="chapter-title">
                  Cloudflare Worker y consumo de datos de gasolineras
                </span>
              </div>

              {/* 39:00 */}

              <div
                className="chapter-item chapter-clickable"
                onClick={() => goToChapter(2340)}
              >
                <span className="chapter-time">39:00</span>

                <span className="chapter-title">
                  Filtros, ubicación y búsqueda de gasolineras
                </span>
              </div>

              {/* 40:00 */}

              <div
                className="chapter-item chapter-clickable"
                onClick={() => goToChapter(2400)}
              >
                <span className="chapter-time">40:00</span>

                <span className="chapter-title">
                  Mapa interactivo con Leaflet y OpenStreetMap
                </span>
              </div>

              {/* 42:00 */}

              <div
                className="chapter-item chapter-clickable"
                onClick={() => goToChapter(2520)}
              >
                <span className="chapter-time">42:00</span>

                <span className="chapter-title">
                  Resultados y pruebas finales de Gasolineras México
                </span>
              </div>
            </div>
          </section>
        )}

        {/* API OPENWEATHER */}

        {selectedApi === "weather" && <WeatherApp />}

        {/* EFEMÉRIDES */}

        {selectedApi === "history" && <HistoricalEventsApp />}

        {/* OPEN-METEO */}

        {selectedApi === "climas" && <MeteorologyApp />}

        {/* POKÉAPI */}

        {selectedApi === "pokemon" && <PokemonApp />}

        {/* GASOLINERAS */}

        {selectedApi === "gasolineras" && <GasStationsApp />}
      </section>
    </main>
  );
};

export default Home;
