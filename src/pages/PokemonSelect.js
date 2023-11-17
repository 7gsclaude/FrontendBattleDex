import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PokemonSelect = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=898"
        );
        setPokemonList(response.data.results);
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
      }
    };

    fetchPokemonList();
  }, []);

  return (
    <div>
      <h1>PokemonSelect</h1>

      <ul>
        {pokemonList.map((pokemon, index) => (
          <li key={pokemon.name}>
            <Link to={`/pokemon/${index + 1}`}>
              {pokemon.name}
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                  index + 1
                }.png`}
                alt={pokemon.name}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonSelect;
// i have changed the src image url to the orignial location of the sprite images. i got a 403 that says that could be a broken data. 