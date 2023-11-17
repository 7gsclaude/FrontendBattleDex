import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PokemonDetail = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        setPokemonData(response.data);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemonData();
  }, [id]);

  return (
    <div>
      {pokemonData && (
        <div>
          <h1>{pokemonData.name}</h1>
          <img
            src={`https://pokeapi.co/media/sprites/pokemon/${pokemonData.id}.png`}
            alt={pokemonData.name}
          />
          <p>
            Types: {pokemonData.types.map((type) => type.type.name).join(", ")}
          </p>
          {/* Display other Pokémon data as needed */}
        </div>
      )}
    </div>
  );
};

export default PokemonDetail;
