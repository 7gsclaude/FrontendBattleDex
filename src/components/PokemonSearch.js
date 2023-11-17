import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PokemonSearch() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [suggestedPokemon, setSuggestedPokemon] = useState([]);

  const navigate = useNavigate();
  

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

  const handleSelect = async (selectedPokemon) => {
    try {
      // Fetch detailed information for the selected Pokémon
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`
      );
      setPokemonData(response.data);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }

    // Clear the suggestions
    setSuggestedPokemon([]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearch();
    handleSelect();

    // Clear the suggestions
    setSuggestedPokemon([]);
  };

  const handleBlur = () => {
    // Clear the suggestions
    setSuggestedPokemon([]);
  };

  useEffect(() => {
    // Add a click event listener to the window to close the dropdown on outside click
    const handleClickOutside = (e) => {
      if (
        e.target.id !== "pokemonInput" && // Check if the clicked element is not the input
        !e.target.classList.contains("suggestion-item") // Check if the clicked element is not a suggestion item
      ) {
        setSuggestedPokemon([]); // Close the dropdown
      }


    };

    window.addEventListener("click", handleClickOutside);

    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter Pokémon name"
          value={pokemonName}
          onChange={handleInputChange}
          onBlur={handleBlur}
          list="pokemonSuggestions"
        />
        <button type="submit">Search</button>
      </form>

      {/* Display the dropdown list of suggested Pokémon */}
      {suggestedPokemon.length > 0 && (
        <datalist id="pokemonSuggestions">
          {suggestedPokemon.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
      )}

      {pokemonData && (
        <div>
          <h2 onClick={() => navigate (`/pokemon/${pokemonData.name}`)}>
            {pokemonData.name}</h2>
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
