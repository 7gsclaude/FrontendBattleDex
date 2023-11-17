import React, { useState } from "react";
import axios from "axios";

function PokemonSearch() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [suggestedPokemon, setSuggestedPokemon] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      setPokemonData(response.data);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      if (error.response && error.response.status === 404) {
        alert("Pokémon not found!");
      }
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value.toLowerCase();
    setPokemonName(input);

    // Fetch suggestions based on the input
    fetchSuggestedPokemon(input);
  };

  const fetchSuggestedPokemon = async (input) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=898`
      );
      const pokemonNames = response.data.results.map((pokemon) =>
        pokemon.name.toLowerCase()
      );

      // Filter the names that match the input
      const suggestions = pokemonNames.filter((name) => name.includes(input));

      // Set the list of suggested Pokémon names
      setSuggestedPokemon(suggestions);
    } catch (error) {
      console.error("Error fetching suggested Pokémon:", error);
    }
  };

  const handleSelect = (selectedPokemon) => {
    // Set the selected Pokémon name when an option is clicked
    setPokemonName(selectedPokemon);
  };

  const handleBlur = () => {
    // Clear the suggestions when the input loses focus
    setSuggestedPokemon([]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Pokémon name or ID"
        value={pokemonName}
        onChange={handleInputChange}
        onBlur={handleBlur}
      />
      <button onClick={handleSearch}>Search</button>

      {/* Display the dropdown list of suggested Pokémon */}
      {suggestedPokemon.length > 0 && (
        <select onChange={(e) => handleSelect(e.target.value)}>
          {suggestedPokemon.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      )}

      {pokemonData && (
        <div>
          <h2>{pokemonData.name}</h2>
          <p>
            Types: {pokemonData.types.map((type) => type.type.name).join(", ")}
          </p>
          {/* Display other Pokémon data as needed */}
        </div>
      )}
    </div>
  );
}

export default PokemonSearch;
