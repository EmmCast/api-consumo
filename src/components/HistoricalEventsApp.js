import React, { useState } from 'react';
import axios from 'axios';

import '../css/HistoricalEventsApp.css';
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

    if (!date.trim()) {
      setError('Por favor, ingresa una fecha.');
      return;
    }

    try {

      const response = await axios.get(
        `https://history.muffinlabs.com/date/${date}`
      );

      const eventos =
        response.data.data.Events.slice(0, 10);

      setEvents(eventos);

    } catch (err) {

      console.error(err);

      setError(
        'No se pudieron obtener los eventos históricos.'
      );

    }
  };

  const translateEvents = async () => {

    if (events.length === 0) {
      setError('Primero debes realizar una búsqueda.');
      return;
    }

    setError('');
    setTranslating(true);

    try {

      const texts = events.map(
        (event) => event.text
      );

      console.log(
        'Eventos que se traducirán:',
        texts.length
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

      console.error(
        'Error traduciendo efemérides:',
        err
      );

      setError(
        'No fue posible traducir los eventos. Intenta nuevamente.'
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
    <section className="history-card">

      <h1 className="history-title">
        Explora Eventos Históricos
      </h1>

      <div className="history-search">

        <label htmlFor="history-date">
          Fecha
        </label>

        <input
          id="history-date"
          className="history-input"
          type="text"
          placeholder="MM/DD - Ej. 07/04"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          className="history-main-button"
          onClick={fetchEvents}
        >
          Buscar
        </button>

      </div>

      {error && (
        <div className="history-error">
          {error}
        </div>
      )}

      {events.length > 0 && (
        <div className="history-language-buttons">

          {translatedEvents.length === 0 && (
            <button
              onClick={translateEvents}
              disabled={translating}
            >
              {translating
                ? 'Traduciendo...'
                : 'Traducir al español'}
            </button>
          )}

          {translatedEvents.length > 0 && (
            <>
              <button
                onClick={() =>
                  setShowTranslation(false)
                }
                className={
                  !showTranslation
                    ? 'active'
                    : ''
                }
              >
                Ver original
              </button>

              <button
                onClick={() =>
                  setShowTranslation(true)
                }
                className={
                  showTranslation
                    ? 'active'
                    : ''
                }
              >
                Ver español
              </button>
            </>
          )}

        </div>
      )}

      {eventsToShow.length > 0 ? (

        <div className="history-results">

          {eventsToShow.map(
            (event, index) => (

              <article
                className="history-event-card"
                key={index}
              >

                <span className="history-year">
                  {event.year}
                </span>

                <p>
                  {showTranslation
                    ? event.translatedText
                    : event.text}
                </p>

              </article>

            )
          )}

        </div>

      ) : (

        !error && (
          <p className="history-empty">
            No hay eventos para esta fecha.
          </p>
        )

      )}

    </section>
  );
};

export default HistoricalEventsApp;