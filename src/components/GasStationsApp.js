import React, { useEffect, useState } from "react";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "../css/GasStationsApp.css";

import { getGasStations } from "../services/gasStationService";

import { calculateDistance } from "../services/distanceService";

const GasStationsApp = () => {
  const [stations, setStations] = useState([]);

  const [results, setResults] = useState([]);

  const [latitude, setLatitude] = useState(19.4326);

  const [longitude, setLongitude] = useState(-99.1332);

  const [fuel, setFuel] = useState("regular");

  const [radius, setRadius] = useState(10);

  const [maxPrice, setMaxPrice] = useState("");

  const [searchName, setSearchName] = useState("");

  const [order, setOrder] = useState("distance");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadStations = async () => {
      try {
        setLoading(true);

        const data = await getGasStations();

        setStations(data);
      } catch (err) {
        console.error(err);

        setError("No fue posible obtener las gasolineras.");
      } finally {
        setLoading(false);
      }
    };

    loadStations();
  }, []);

  const getMyLocation = () => {
    if (!navigator.geolocation) {
      setError("La geolocalización no está disponible.");

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);

        setLongitude(position.coords.longitude);
      },
      () => {
        setError("No fue posible obtener tu ubicación.");
      },
    );
  };

  const searchStations = () => {
    const filtered = stations
      .map((station) => {
        const distance = calculateDistance(
          Number(latitude),
          Number(longitude),
          station.latitude,
          station.longitude,
        );

        const fuelPrice = station.prices.find((price) => price.type === fuel);

        return {
          ...station,
          distance,
          selectedPrice: fuelPrice?.amount || null,
        };
      })

      .filter((station) => station.distance <= Number(radius))

      .filter((station) => station.selectedPrice !== null)

      .filter((station) => {
        if (!maxPrice) {
          return true;
        }

        return station.selectedPrice <= Number(maxPrice);
      })

      .filter((station) =>
        station.name.toLowerCase().includes(searchName.toLowerCase()),
      );

    if (order === "price") {
      filtered.sort((a, b) => a.selectedPrice - b.selectedPrice);
    } else {
      filtered.sort((a, b) => a.distance - b.distance);
    }

    setResults(filtered.slice(0, 30));
  };

  return (
    <section className="gas-card">
      <h1>⛽ Gasolineras México</h1>

      <div className="gas-form">
        <button className="location-button" onClick={getMyLocation}>
          📍 Usar mi ubicación
        </button>

        <div className="gas-fields">
          <div>
            <label>Latitud</label>

            <input
              type="number"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>

          <div>
            <label>Longitud</label>

            <input
              type="number"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>

          <div>
            <label>Combustible</label>

            <select value={fuel} onChange={(e) => setFuel(e.target.value)}>
              <option value="regular">Regular</option>

              <option value="premium">Premium</option>

              <option value="diesel">Diésel</option>
            </select>
          </div>

          <div>
            <label>Radio</label>

            <select value={radius} onChange={(e) => setRadius(e.target.value)}>
              <option value="5">5 km</option>

              <option value="10">10 km</option>

              <option value="20">20 km</option>

              <option value="50">50 km</option>
            </select>
          </div>

          <div>
            <label>Precio máximo</label>

            <input
              type="number"
              placeholder="Ej. 24.00"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          <div>
            <label>Nombre</label>

            <input
              type="text"
              placeholder="Ej. PETROMAX"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>

          <div>
            <label>Ordenar por</label>

            <select value={order} onChange={(e) => setOrder(e.target.value)}>
              <option value="distance">Más cercana</option>

              <option value="price">Más barata</option>
            </select>
          </div>
        </div>

        <button className="gas-search-button" onClick={searchStations}>
          Buscar gasolineras
        </button>
      </div>

      {loading && <p>Cargando información...</p>}

      {error && <div className="gas-error">{error}</div>}

      {results.length > 0 && (
        <>
          <div className="gas-map">
            <MapContainer
              center={[Number(latitude), Number(longitude)]}
              zoom={12}
              style={{
                height: "450px",
                width: "100%",
              }}
            >
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {results.map((station) => (
                <Marker
                  key={station.id}
                  position={[station.latitude, station.longitude]}
                >
                  <Popup>
                    <strong>{station.name}</strong>
                    <br />${station.selectedPrice}
                    <br />
                    {station.distance.toFixed(2)} km
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <div className="gas-results">
            {results.map((station) => (
              <article className="gas-result-card" key={station.id}>
                <h3>{station.name}</h3>

                <p>
                  <strong>Precio:</strong> ${station.selectedPrice}
                </p>

                <p>
                  <strong>Distancia:</strong> {station.distance.toFixed(2)} km
                </p>

                <p>
                  <strong>Dirección:</strong> {station.address}
                </p>

                <p>
                  <strong>Permiso:</strong> {station.permit}
                </p>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default GasStationsApp;
