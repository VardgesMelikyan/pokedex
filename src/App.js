import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PokemonsData } from './services/pokemon';
import Card from './components/Card';
import Navbar from './components/Navbar';
import Searchbar from './components/Searchbar';
import Paginations from './components/Pagination';
import './App.css';

function App() {
  const [pokemonsData, setPokemonsData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [api, setApi] = useState('pokemon');
  const initialUrl = `https://pokeapi.co/api/v2/${api}`;
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      PokemonsData(initialUrl)
        .then((body) => {
          if (body.results) {
            body.results.map((url) => {
              PokemonsData(url.url)
                .then((data) => {
                  setPokemonsData(data)
                })
            })
          } else (
            setPokemonsData(body)
          )
        })
      setLoading(false);
    }
    fetchData()
  }, [initialUrl])
  // const next = async () => {
  //   setLoading(true);
  //   let data = await getAllPokemon(nextUrl);
  //   // await loadingPokemons(data.results);
  //   setNextUrl(data.next);
  //   setPrevUrl(data.previous);
  //   setLoading(false);
  // }
  // const prev = async () => {
  //   if (!prevUrl) {
  //     return
  //   }
  //   setLoading(true);
  //   let data = await getAllPokemon(prevUrl);
  //   // await loadingPokemons(data.results);
  //   setNextUrl(data.next);
  //   setPrevUrl(data.previous);
  //   setLoading(false);
  // }

  console.log(pokemonsData)
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
                    <a href={'pokemon/' + pokemon.id} key={pokemon.id}>Read More</a>
                  </div>
                </div>
              );
            })
            }
          </div>
        </>
      )}
    </div>
  );
}

export default App;
