import React from 'react';

const ApiMenu = ({ onSelectApi }) => {
  return (
    <nav className="api-menu">

      <button onClick={() => onSelectApi('weather')}>
        API Clima
      </button>

      <button onClick={() => onSelectApi('history')}>
        API Efemérides
      </button>

      <button onClick={() => onSelectApi('climas')}>
        API Metereologia
      </button>

      <button onClick={() => onSelectApi('pokemon')}>
        API 4
      </button>

    </nav>
  );
};

export default ApiMenu;