import React, { useState } from 'react';
import axios from 'axios';

import { translateTexts } from '../services/translationService';

const HistoricalEventsApp = () => {

  const [date, setDate] = useState('');
  const [events, setEvents] = useState([]);
  const [translatedEvents, setTranslatedEvents] = useState([]);

  const [error, setError] = useState('');
  const [translating, setTranslating] = useState(false);

  const [showTranslation, setShowTranslation] = useState(false);


  const fetchEvents = async () => {

    setError('');
    setEvents([]);
    setTranslatedEvents([]);
    setShowTranslation(false);

    if (!date) {
      setError('Por favor, ingresa una fecha.');
      return;
    }

    try {

      const response = await axios.get(
        `https://history.muffinlabs.com/date/${date}`
      );

      setEvents(response.data.data.Events);

    } catch (err) {

      console.error(err);

      setError(
        'No se pudieron obtener los eventos históricos.'
      );

    }
  };


  const translateEvents = async () => {

    if (events.length === 0) {
      setError(
        'Primero debes realizar una búsqueda.'
      );

      return;
    }

    setError('');
    setTranslating(true);

    try {

      const texts = events.map(
        event => event.text
      );

      const translations =
        await translateTexts(texts);

      const translated = events.map(
        (event, index) => ({
          ...event,
          translatedText: translations[index]
        })
      );

      setTranslatedEvents(translated);

      setShowTranslation(true);

    } catch (err) {

      console.error(err);

      setError(
        'No fue posible traducir los eventos.'
      );

    } finally {

      setTranslating(false);

    }
  };


  const eventsToShow =
    showTranslation
      ? translatedEvents
      : events;


  return (
    <div className="events-container">

      <h1>
        Explora Eventos Históricos
      </h1>


      <div className="events-form">

        <input
          type="text"
          placeholder="Formato MM/DD (ej. 07/04)"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
        />

        <button onClick={fetchEvents}>
          Buscar
        </button>

      </div>


      {error && (
        <p className="error">
          {error}
        </p>
      )}


      {events.length > 0 && (

        <div className="translation-actions">

          {!showTranslation ? (

            <button
              onClick={translateEvents}
              disabled={translating}
            >

              {translating
                ? 'Traduciendo...'
                : 'Traducir al español'}

            </button>

          ) : (

            <button
              onClick={() =>
                setShowTranslation(false)
              }
            >
              Ver original
            </button>

          )}


          {translatedEvents.length > 0 && (
            <button
              onClick={() =>
                setShowTranslation(true)
              }
            >
              Ver español
            </button>
          )}

        </div>

      )}


      {eventsToShow.length > 0 ? (

        <ul className="events-list">

          {eventsToShow.map(
            (event, index) => (

              <li key={index}>

                <p>

                  <strong>
                    {event.year}
                  </strong>

                  {': '}

                  {showTranslation
                    ? event.translatedText
                    : event.text}

                </p>

              </li>

            )
          )}

        </ul>

      ) : (

        !error && (
          <p>
            No hay eventos para esta fecha.
          </p>
        )

      )}

    </div>
  );
};

export default HistoricalEventsApp;