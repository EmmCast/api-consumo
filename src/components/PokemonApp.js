import React, { useState } from 'react';
import axios from 'axios';

const PokemonApp = () => {
  const [region, setRegion] = useState('kanto');
  const [number, setNumber] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState('');

  const fetchPokemon = async () => {
    setError('');
    setPokemon(null);

    if (!number) {
      setError('Ingresa el número del Pokémon.');
      return;
    }

    try {
      // Primero obtenemos la Pokédex correspondiente
      const pokedexResponse = await axios.get(
        `https://pokeapi.co/api/v2/pokedex/${region}`
      );

      const entry = pokedexResponse.data.pokemon_entries.find(
        item => item.entry_number === Number(number)
      );

      if (!entry) {
        setError(
          'No existe un Pokémon con ese número en la región seleccionada.'
        );
        return;
      }

      const pokemonName = entry.pokemon_species.name;

      // Después obtenemos sus datos completos
      const pokemonResponse = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );

      setPokemon({
        ...pokemonResponse.data,
        regionalNumber: entry.entry_number
      });

    } catch (err) {
      console.error(err);
      setError('No fue posible consultar la Pokédex.');
    }
  };

  return (
    <div className="pokemon-container">

      <h1>Consulta Pokédex</h1>

      <div className="pokemon-form">

        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="kanto">Kanto</option>
          <option value="original-johto">Johto</option>
          <option value="hoenn">Hoenn</option>
          <option value="original-sinnoh">Sinnoh</option>
        </select>

        <input
          type="number"
          min="1"
          placeholder="Número del Pokémon"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />

        <button onClick={fetchPokemon}>
          Buscar
        </button>

      </div>

      {error && (
        <p className="error">
          {error}
        </p>
      )}

      {pokemon && (
        <div className="pokemon-info">

          <h2>
            #{pokemon.regionalNumber} {pokemon.name}
          </h2>

          <img
            src={
              pokemon.sprites.other['official-artwork']
                .front_default
            }
            alt={pokemon.name}
          />

          <p>
            <strong>Tipo:</strong>{' '}
            {pokemon.types
              .map(item => item.type.name)
              .join(', ')}
          </p>

          <p>
            <strong>Altura:</strong>{' '}
            {pokemon.height / 10} m
          </p>

          <p>
            <strong>Peso:</strong>{' '}
            {pokemon.weight / 10} kg
          </p>

          <p>
            <strong>Habilidades:</strong>{' '}
            {pokemon.abilities
              .map(item => item.ability.name)
              .join(', ')}
          </p>

        </div>
      )}

    </div>
  );
};

export default PokemonApp;