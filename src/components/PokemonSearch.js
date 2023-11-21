import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const PokeDexImage = styled.img`
width: 60%;
height: 60%;

`

const PokeSearch = styled.div`
  background-color: #e05555;
  padding: 10px; /* Add some padding for spacing */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const PokeDisplay = styled.div`
background-color: #edeff1;
padding: 10px; /* Add some padding for spacing */
`


function PokemonSearch() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [suggestedPokemon, setSuggestedPokemon] = useState([]);
  const [pokemonSprite, setPokemonSprite] = useState(null); // New state for sprite URL

  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );

      setPokemonData(response.data);

      // Fetch the sprite URL separately
      const spriteResponse = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${response.data.id}`
      );
      setPokemonSprite(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.data.id}.png`
      );
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearch();

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
      <PokeSearch>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Enter Pokémon name"
            value={pokemonName}
            onChange={handleInputChange}
            onBlur={handleBlur}
            list="pokemonSuggestions"
          />
          <button type="submit">Enter</button>
        </form>
      </PokeSearch>

      {/* Display the dropdown list of suggested Pokémon */}
      {suggestedPokemon.length > 0 && (
        <datalist id="pokemonSuggestions">
          {suggestedPokemon.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
      )}

      {pokemonData && (
        <PokeDisplay>
          <div>
            <h2 onClick={() => navigate(`/pokemon/${pokemonData.name}`)}>
              {pokemonData.name}
            </h2>
            {/* Apply the styled component directly to the img tag */}
            <PokeDexImage src={pokemonSprite} alt={pokemonData.name} />{" "}
            {/* Display the sprite image */}
            <p>
              Types:{" "}
              {pokemonData.types.map((type) => type.type.name).join(", ")}
            </p>
            <h3>Move Set</h3>
            <ul>
              {pokemonData.moves.slice(0, 5).map((moveData) => (
                <li key={moveData.move.name}>{moveData.move.name}</li>
              ))}
            </ul>
          </div>
        </PokeDisplay>
      )}
    </div>
  );
}

export default PokemonSearch;