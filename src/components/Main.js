import React from 'react'
import PokemonSelect from '../pages/PokemonSelect'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import PokemonDetail from './PokemonDetail'

//remember when calling things from the same folder to use ./ to call it. no added path needed

const Main = () => {
  ///any restful stuff will be happening here. So like adding pokemon teams, editing, updating that info, and deleting.
  

    return (
  <main>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemon" element={<PokemonSelect />} />
      <Route path="/pokemon/:id" element={<PokemonDetail />} />
    </Routes>
  </main>
    );
}

export default Main