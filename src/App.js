import React, { useState, useEffect } from 'react';
import { PokemonsData } from './services/pokemon';
import Card from './components/Card';
import Navbar from './components/Navbar';
import Searchbar from './components/Searchbar';
import SingleCard from './components/Card/SingleCard';
import Paginations from './components/Pagination';
import './App.css';

function App() {
  const [pokemonsData, setPokemonsData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0)
  const [api] = useState(window.location.pathname.split('/')[1] ? window.location.pathname.split('/')[1] : 'pokemon');
  const [typeName] = useState((window.location.pathname.split('/')[2] ? window.location.pathname.split('/')[2] : ''));
  const initialUrl = `https://pokeapi.co/api/v2/${api}/${typeName}`;
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      switch (api) {
        case 'pokemon':
          await PokemonsData(initialUrl + '?offset=00&limit=10')
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
      setNextUrl((window.location.pathname.split('/')[2] ? window.location.pathname.split('/')[2] : ''))
      setPrevUrl((window.location.pathname.split('/')[2] ? window.location.pathname.split('/')[2] - 1 : ''))
      setLoading(false);
    }
    fetchData()
  }, [])
  const next = async () => {
    setLoading(true);
    console.log(nextUrl)
    // await PokemonsData(initialUrl)
    //   .then(body => {
    //     setPokemonsData([body.pokemon, api])
    //   })
    setNextUrl(parseInt(nextUrl) + 1);
    setPrevUrl(nextUrl);
    setLoading(false);
  }
  const prev = async () => {
    if (!prevUrl) {
      return
    }
    setLoading(true);
    await PokemonsData(initialUrl)
      .then(body => {
        setPokemonsData([body.pokemon, api])
      })
    setNextUrl(prevUrl);
    setPrevUrl(parseInt(prevUrl) - 1);
    setLoading(false);
  }
  const somePage = async (data) => {
    setLoading(true);
    await PokemonsData(`https://pokeapi.co/api/v2/pokemon?offset=${(data % 2 == 0) ? data : data}0&limit=10`)
      .then(body => {
        setPokemonsData([body.results, api])
      })
    setPage('')
    setPage(data);
    setLoading(false);
  }
  if (!pokemonsData[0]) {
    return ""
  }
  return (
    <div>
      {loading ? <h1>Loading...</h1> : (
        <>
          <Navbar />
          <Searchbar pokemon={pokemonsData} />
          <div className="grid-container">
            {
              pokemonsData[1] === 'pokemon' ? (
                pokemonsData[0].map((p, i) => {
                  return <Card key={p.name} pokemon={p.url} />
                })) : ''
            }
            {
              pokemonsData[1] === 'type' ?
                (pokemonsData[0].map((p, i) => {
                  return <Card key={p.name} pokemon={p.pokemon.url} />
                })) : ''
            }
          </div>
          {
            pokemonsData[1] === 'singlepokemon' ?
              <SingleCard pokemon={pokemonsData[0]} next={next} prev={prev} />
              : ''
          }
          <Paginations page={page} somePage={somePage} />
        </>
      )}
    </div>
  );
}

export default App;
