import React, { useState, useEffect } from 'react';
import { getAllPokemon, fetchKantoPokemon } from './services/pokemon';
import Card from './components/Card';
import Navbar from './components/Navbar';
import Searchbar from './components/Searchbar';
import Paginations from './components/Pagination';
import './App.css';
function App() {
  const [pokemonsType, setPokemonsType] = useState('');
  const [pokemonData, setPokemonData] = useState('');
  const [pokemonsData, setPokemonsData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [api, setApi] = useState('pokemon');
  const initialUrl = `https://pokeapi.co/api/v2/${api}`;
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      let response = await getAllPokemon(initialUrl);
      let res = await fetchKantoPokemon(initialUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previus);
      await loadingPokemons(response.results);
      setLoading(false);
    }
    fetchData();
  }, [initialUrl])

  function changeApi(params) {
    switch (params) {
      case 'singlePokemon':
        return (
          setApi('pokemon/' + params.id)
        );
      case 'pokemonsType':
        return (
          setApi('type/' + params.id)
        );
      default:
        return 'pokemon';
    }
  }

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadingPokemons(data.results);
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
    await loadingPokemons(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const loadingPokemons = async (data) => {
    let _pokemon = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getAllPokemon(pokemon.url);
      return pokemonRecord
    }))
    setPokemonsData(_pokemon)
  }
  return (
    <div>
      {loading ? <h1>Loading...</h1> : (
        <>
          <Paginations pokemon={''} />
          <Navbar />
          <Searchbar />
          <div className="grid-container">
            {pokemonsData.map((pokemon, i) => {
              return (
                <div key={pokemon.id}>
                  <Card pokemon={pokemon} />
                  <div className="btn btn-info" >
                    <a href={'pokemon/' + pokemon.id} key={i}>Read More</a>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
export default App;