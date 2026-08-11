import axios from 'axios';

const PLACES_URL =
  'https://publicacionexterna.azurewebsites.net/publicaciones/places';

const PRICES_URL =
  'https://publicacionexterna.azurewebsites.net/publicaciones/prices';


const parsePlaces = (xmlText) => {

  const parser = new DOMParser();

  const xml =
    parser.parseFromString(
      xmlText,
      'application/xml'
    );

  const places =
    Array.from(
      xml.getElementsByTagName('place')
    );

  return places.map((place) => {

    const location =
      place.getElementsByTagName('location')[0];

    return {

      id:
        place.getAttribute('place_id'),

      name:
        place.getElementsByTagName('name')[0]
          ?.textContent || 'Sin nombre',

      permit:
        place.getElementsByTagName('cre_id')[0]
          ?.textContent || '',

      address:
        location
          ?.getElementsByTagName('address_street')[0]
          ?.textContent || '',

      longitude:
        Number(
          location
            ?.getElementsByTagName('x')[0]
            ?.textContent
        ),

      latitude:
        Number(
          location
            ?.getElementsByTagName('y')[0]
            ?.textContent
        ),

      prices: []
    };

  });
};


const parsePrices = (xmlText) => {

  const parser = new DOMParser();

  const xml =
    parser.parseFromString(
      xmlText,
      'application/xml'
    );

  const places =
    Array.from(
      xml.getElementsByTagName('place')
    );

  const prices = {};

  places.forEach((place) => {

    const id =
      place.getAttribute('place_id');

    const gasPrices =
      Array.from(
        place.getElementsByTagName('gas_price')
      );

    prices[id] = gasPrices.map(
      (price) => ({
        type:
          price.getAttribute('type'),

        amount:
          Number(price.textContent),

        updated:
          price.getAttribute('update_time')
      })
    );

  });

  return prices;
};


export const getGasStations = async () => {

  const [
    placesResponse,
    pricesResponse
  ] = await Promise.all([

    axios.get(
      PLACES_URL,
      {
        responseType: 'text'
      }
    ),

    axios.get(
      PRICES_URL,
      {
        responseType: 'text'
      }
    )

  ]);

  const places =
    parsePlaces(placesResponse.data);

  const prices =
    parsePrices(pricesResponse.data);

  return places.map(
    (station) => ({
      ...station,
      prices:
        prices[station.id] || []
    })
  );
};