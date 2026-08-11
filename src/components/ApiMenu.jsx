import React from "react";

const ApiMenu = ({ selectedApi, onSelectApi }) => {
  return (
    <nav className="api-menu">
      <button
        className={selectedApi === "home" ? "api-button active" : "api-button"}
        onClick={() => onSelectApi("home")}
        title="Volver al video"
      >
        🏠
      </button>

      <button
        className={
          selectedApi === "weather" ? "api-button active" : "api-button"
        }
        onClick={() => onSelectApi("weather")}
      >
        Clima
      </button>

      <button
        className={
          selectedApi === "history" ? "api-button active" : "api-button"
        }
        onClick={() => onSelectApi("history")}
      >
        Efemérides
      </button>

      <button
        className={
          selectedApi === "climas" ? "api-button active" : "api-button"
        }
        onClick={() => onSelectApi("climas")}
      >
        Meteorología
      </button>

      <button
        className={
          selectedApi === "pokemon" ? "api-button active" : "api-button"
        }
        onClick={() => onSelectApi("pokemon")}
      >
        Pokémon
      </button>

      <button
        className={
          selectedApi === "gasolineras" ? "api-button active" : "api-button"
        }
        onClick={() => onSelectApi("gasolineras")}
      >
        ⛽ Gasolineras México
      </button>
    </nav>
  );
};

export default ApiMenu;
