import React, { useState, useEffect } from 'react';
import { getAllPokemon, getPokemon } from './services/pokemon';
import Card from './components/Card';
import Navbar from './components/Navbar';
import Searchbar from './components/Searchbar';
import logo from './logo.svg';
import './App.css';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [typeUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon';

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previus);
      console.log(response);
      await loadingPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, [])

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const prev = async () => {
    if (!prevUrl) {
      return
    }
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const loadingPokemon = async (data) => {
    let _pokemon = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getAllPokemon(pokemon.url);
      return pokemonRecord
    }))
    setPokemonData(_pokemon)
  }
  const byType = async (data) => {
    console.log('ok')
    // setLoading(true);
    // let data = await getPokemon(url);
    // await loadingPokemon(data.results);
    // setLoading(false);
  }

  return (
    <div>
      {loading ? <h1>Loading...</h1> : (
        <>
          <Navbar />
          <Searchbar />
          <div className="btn">
            <button onClick={prev}>Prev</button>
            <button onClick={next}>Next</button>
          </div>
          <div className="grid-container">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
