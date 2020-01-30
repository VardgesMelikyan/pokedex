import React, { useState, useEffect } from 'react';
import { PokemonsData } from './services/pokemon';
import Card from './components/Card';
import Navbar from './components/Navbar';
import Searchbar from './components/Searchbar';
import SingleCard from './components/Card/SingleCard';
// import Paginations from './components/Pagination';
import './App.css';

function App() {
  const [pokemonsData, setPokemonsData] = useState([]);
  // const [nextUrl, setNextUrl] = useState('');
  // const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [api] = useState(window.location.pathname.split('/')[1] ? window.location.pathname.split('/')[1] : 'pokemon');
  const [typeName] = useState((window.location.pathname.split('/')[2] ? window.location.pathname.split('/')[2] : ''));
  const initialUrl = `https://pokeapi.co/api/v2/${api}/${typeName}`;
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      switch (api) {
        case 'pokemon':
          await PokemonsData(initialUrl)
            .then(body => {
              if (!typeName) {
                setPokemonsData([body.results, api])
              } else {
                setPokemonsData([body, `single${api}`])
              }
            })
          break;
        case 'type':
          await PokemonsData(initialUrl)
            .then(body => {
              setPokemonsData([body.pokemon, api])
            })
          break;
        default:
      }
      setLoading(false);
    }
    fetchData()
  }, [])
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
  if (!pokemonsData) {
    return
  }
  console.log('ok')
  return (
    <div>
      {loading ? <h1>Loading...</h1> : (
        <>
          {/* <Paginations pokemon={pokemonsData} /> */}
          <Navbar />
          <Searchbar pokemon={pokemonsData} />
          <div className="grid-container">
            {
              pokemonsData[1] === 'pokemon' ? (
                pokemonsData[0].map((p, i) => {
                  return <Card key={i} pokemon={p.url} />
                })) : ''
            }
            {
              pokemonsData[1] === 'type' ?
                (pokemonsData[0].map((p, i) => {
                  return <Card key={i} pokemon={p.pokemon.url} />
                })) : ''
            }
          </div>
          {
            pokemonsData[1] === 'singlepokemon' ?
              <SingleCard pokemon={pokemonsData[0]} />
              : ''
          }
        </>
      )}
    </div>
  );
}

export default App;
