import React, { useEffect, useState } from 'react';

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  CircleMarker
} from 'react-leaflet';

import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import 'leaflet/dist/leaflet.css';
import '../css/GasStationsApp.css';

import {
  getGasStations
} from '../services/gasStationService';

import {
  calculateDistance
} from '../services/distanceService';


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});
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

        console.log("Gasolineras cargadas:", data.length);

        setStations(data);
      } catch (err) {
        console.error(err);

        setError("No fue posible obtener la información de las gasolineras.");
      } finally {
        setLoading(false);
      }
    };

    loadStations();
  }, []);

  const getMyLocation = () => {
    setError("");

    if (!navigator.geolocation) {
      setError("Tu navegador no permite obtener la ubicación.");

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
    setError("");

    if (latitude === "" || longitude === "") {
      setError(
        'Debes indicar una ubicación o utilizar el botón "Usar mi ubicación".',
      );

      return;
    }

    if (!fuel) {
      setError("Debes seleccionar un tipo de combustible.");

      return;
    }

    if (!radius) {
      setError("Debes seleccionar un radio de búsqueda.");

      return;
    }

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

          selectedPrice: fuelPrice?.amount ?? null,
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

   
      .filter((station) => {
        if (!searchName.trim()) {
          return true;
        }

        return station.name
          .toLowerCase()
          .includes(searchName.trim().toLowerCase());
      });


    if (order === "price") {
      filtered.sort((a, b) => a.selectedPrice - b.selectedPrice);
    } else {
      filtered.sort((a, b) => a.distance - b.distance);
    }


    setResults(filtered.slice(0, 30));
  };

  return (
    <section className="gas-card">
      <h1 className="gas-title">Gasolineras México</h1>

      <div className="gas-form">
        <button className="location-button" onClick={getMyLocation}>
          📍 Usar mi ubicación
        </button>

        <p className="required-note">
          <span className="required">*</span> Campos obligatorios
        </p>

        <div className="gas-fields">
          {/* LATITUD */}

          <div className="gas-field">
            <label htmlFor="gas-latitude">
              Latitud <span className="required">*</span>
            </label>

            <input
              id="gas-latitude"
              type="number"
              step="any"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>

          {/* LONGITUD */}

          <div className="gas-field">
            <label htmlFor="gas-longitude">
              Longitud <span className="required">*</span>
            </label>

            <input
              id="gas-longitude"
              type="number"
              step="any"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>

          {/* COMBUSTIBLE */}

          <div className="gas-field">
            <label htmlFor="gas-fuel">
              Combustible <span className="required">*</span>
            </label>

            <select
              id="gas-fuel"
              value={fuel}
              onChange={(e) => setFuel(e.target.value)}
            >
              <option value="regular">Regular</option>

              <option value="premium">Premium</option>

              <option value="diesel">Diésel</option>
            </select>
          </div>

          {/* RADIO */}

          <div className="gas-field">
            <label htmlFor="gas-radius">
              Radio <span className="required">*</span>
            </label>

            <select
              id="gas-radius"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
            >
              <option value="5">5 km</option>

              <option value="10">10 km</option>

              <option value="20">20 km</option>

              <option value="50">50 km</option>
            </select>
          </div>

          {/* PRECIO MÁXIMO */}

          <div className="gas-field">
            <label htmlFor="gas-price">
              Precio máximo
              <span className="optional"> (opcional)</span>
            </label>

            <input
              id="gas-price"
              type="number"
              step="0.01"
              min="0"
              placeholder="Ej. 24.00"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          {/* NOMBRE */}

          <div className="gas-field">
            <label htmlFor="gas-name">
              Nombre
              <span className="optional"> (opcional)</span>
            </label>

            <input
              id="gas-name"
              type="text"
              placeholder="Ej. PETROMAX"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>

          {/* ORDENAMIENTO */}

          <div className="gas-field">
            <label htmlFor="gas-order">Ordenar por</label>

            <select
              id="gas-order"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value="distance">Más cercana</option>

              <option value="price">Más barata</option>
            </select>
          </div>
        </div>

        <button className="gas-search-button" onClick={searchStations}>
          Buscar gasolineras
        </button>
      </div>

      {loading && <p className="gas-loading">Cargando información...</p>}

      {error && <div className="gas-error">{error}</div>}

      {results.length > 0 && (
        <>
          <div className="gas-summary">
            Se encontraron <strong>{results.length}</strong> gasolineras.
          </div>

          {/* MAPA */}

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

              {/* UBICACIÓN DEL USUARIO */}

              <CircleMarker
                center={[Number(latitude), Number(longitude)]}
                radius={10}
                pathOptions={{
                  fillColor: "#18a4dc",
                  color: "#ffffff",
                  weight: 3,
                  fillOpacity: 1,
                }}
              >
                <Popup>
                  <strong>Tu ubicación</strong>
                  <br />
                  Latitud: {Number(latitude).toFixed(6)}
                  <br />
                  Longitud: {Number(longitude).toFixed(6)}
                </Popup>
              </CircleMarker>

              {/* GASOLINERAS */}

              {results.map((station) => (
                <Marker
                  key={station.id}
                  position={[station.latitude, station.longitude]}
                >
                  <Popup>
                    <strong>{station.name}</strong>
                    <br />
                    Precio: ${station.selectedPrice}
                    <br />
                    Distancia: {station.distance.toFixed(2)} km
                    <br />
                    {station.address &&
                      station.address !== "Dirección no disponible" && (
                        <>Dirección: {station.address}</>
                      )}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* RESULTADOS */}

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
                  <strong>Dirección:</strong>{" "}
                  {station.address || "Dirección no disponible"}
                </p>

                <p>
                  <strong>Permiso:</strong> {station.permit || "No disponible"}
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
