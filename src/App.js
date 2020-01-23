import React, { useState, useEffect } from 'react';
import { getAllPokemon, getPokemon, getType } from './services/pokemon';
import Card from './components/Card';
import Navbar from './components/Navbar';
import Searchbar from './components/Searchbar';
import logo from './logo.svg';
import './App.css';
function App() {
  const [pokemonsType] = useState('');
  const [pokemonData, setPokemonData] = useState('');
  const [pokemonsData, setPokemonsData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [typeUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon';
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      let response = await getAllPokemon(initialUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previus);
      await loadingPokemons(response.results);
      //console.log(response.results);      
      setLoading(false);
    }
    fetchData();
  }, [])

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

  const getPokemonUrl = async (event) => {
    let pokemonUrl = initialUrl + '/' + (event);
    let response = await getPokemon(pokemonUrl);
    await loadingPokemon(response);
  }
  const loadingPokemon = (data) => {
    setPokemonData(data)
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
          <Navbar />
          <Searchbar />
          {pokemonData ?
            <div className="grid-container">
              <div key={pokemonData.id}>
                <Card pokemon={pokemonData} full='yes' />
                <div className="btn btn-info" >

                </div>
              </div>
            </div>
            : (
              <>
                <div className="btn">
                  <button onClick={prev}>Prev</button>
                  <button onClick={next}>Next</button>
                </div>
                <div className="grid-container">
                  {pokemonsData.map((pokemon, i) => {
                    return (
                      <div key={pokemon.id}>
                        <Card pokemon={pokemon} />
                        <div className="btn btn-info" >
                          <button value={pokemon.id} key={i} onClick={() => getPokemonUrl(pokemon.id)}>Read More</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="btn">
                  <button onClick={prev}>Prev</button>
                  <button onClick={next}>Next</button>
                </div>
              </>
            )}
        </>
      )}
    </div>
  );
}
export async function ByType(data) {
  let response = await getType(data)
}
export default App;