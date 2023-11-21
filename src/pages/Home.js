import React from "react";
import PokemonSearch from "../components/PokemonSearch";
import styled from "styled-components";


const HomeContainer = styled.div`
  max-width: 800px; /* Adjust the value as needed */
  margin: 0 auto;
  width: 100%;
  background-color: #ffffffdc;
  border-radius: 10px; /* Adjust the value to control the roundness */
  padding: 20px; /* Add padding for better aesthetics */
  display: flex;
  justify-content: space-between; /* Adjust as needed to control the space between them */
  height: 80vh; /* Adjust the value as needed */
`;

const PokemonSection = styled.div`
  flex: 1; /* Grow to fill available space */
  margin-right: 20px; /* Adjust the margin to create space on the right side */
`;

const Home = () => {
  return (
    <div>
      <HomeContainer>
        <PokemonSection>
          <h1>Call Pokemon</h1>
          <PokemonSearch />
        </PokemonSection>

        <PokemonSection>
          <h1>Enemy Pokemon</h1>
          <PokemonSearch />
        </PokemonSection>
      </HomeContainer>
    </div>
  );
};

export default Home;