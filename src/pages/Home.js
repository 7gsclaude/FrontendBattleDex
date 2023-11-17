import React from 'react'
import PokemonSearch from '../components/PokemonSearch'

const Home = () => {
  return (
    <div>
      <h1>Call Pokemon</h1>
      <PokemonSearch />
      <h1>Enemy Pokemon</h1>
      <PokemonSearch />
    </div>
  );
}

export default Home