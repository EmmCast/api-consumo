import React from 'react';

const ApiMenu = ({
  selectedApi,
  onSelectApi
}) => {

  return (
    <nav className="api-menu">

      <button
        className={
          selectedApi === 'home'
            ? 'api-button active'
            : 'api-button'
        }
        onClick={() => onSelectApi('home')}
        title="Volver al video"
      >
        🏠 Inicio
      </button>

      <button
        className={
          selectedApi === 'weather'
            ? 'api-button active'
            : 'api-button'
        }
        onClick={() => onSelectApi('weather')}
      >
        API Clima
      </button>

      <button
        className={
          selectedApi === 'history'
            ? 'api-button active'
            : 'api-button'
        }
        onClick={() => onSelectApi('history')}
      >
        API Efemérides
      </button>

      <button
        className={
          selectedApi === 'climas'
            ? 'api-button active'
            : 'api-button'
        }
        onClick={() => onSelectApi('climas')}
      >
        API Meteorología
      </button>

      <button
        className={
          selectedApi === 'pokemon'
            ? 'api-button active'
            : 'api-button'
        }
        onClick={() => onSelectApi('pokemon')}
      >
        API Pokémon
      </button>

    </nav>
  );
};

export default ApiMenu;