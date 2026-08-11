import axios from "axios";

const PROXY_URL = "https://gasolineras-proxy.emmcast.workers.dev";

const PLACES_URL = `${PROXY_URL}/places`;

const PRICES_URL = `${PROXY_URL}/prices`;

const getText = (parent, tag) => {
  return parent?.getElementsByTagName(tag)[0]?.textContent?.trim() || "";
};

const parsePlaces = (xmlText) => {
  const parser = new DOMParser();

  const xml = parser.parseFromString(xmlText, "application/xml");

  const places = Array.from(xml.getElementsByTagName("place"));

  console.log("PRIMERA ESTACIÓN XML:", places[0]?.outerHTML);

  return places.map((place) => {
    const location = place.getElementsByTagName("location")[0];
    const street = getText(location, "address_street");
    const colony = getText(location, "address_colony");
    const municipality = getText(location, "municipality");
    const state = getText(location, "state");
    const postalCode = getText(location, "postal_code");
    const address = [street, colony, municipality, state, postalCode]
      .filter(Boolean)
      .join(", ");

    return {
      id: place.getAttribute("place_id"),
      name: getText(place, "name") || "Sin nombre",
      permit: getText(place, "cre_id"),
      address: address || "Dirección no disponible",
      longitude: Number(getText(location, "x")),
      latitude: Number(getText(location, "y")),
      prices: [],
    };
  });
};

const parsePrices = (xmlText) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlText, "application/xml");
  const places = Array.from(xml.getElementsByTagName("place"));
  const prices = {};
  places.forEach((place) => {
    const id = place.getAttribute("place_id");
    const gasPrices = Array.from(place.getElementsByTagName("gas_price"));
    prices[id] = gasPrices.map((price) => ({
      type: price.getAttribute("type"),
      amount: Number(price.textContent),
      updated: price.getAttribute("update_time"),
    }));
  });

  return prices;
};

export const getGasStations = async () => {
  const [placesResponse, pricesResponse] = await Promise.all([
    axios.get(PLACES_URL, {
      responseType: "text",
    }),

    axios.get(PRICES_URL, {
      responseType: "text",
    }),
  ]);

  const places = parsePlaces(placesResponse.data);

  const prices = parsePrices(pricesResponse.data);

  return places.map((station) => ({
    ...station,

    prices: prices[station.id] || [],
  }));
};
