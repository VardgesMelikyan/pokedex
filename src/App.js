import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchKantoPokemon } from './services/pokemon';
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
  const [api, setApi] = useState('pokemon/1');
  const initialUrl = `https://pokeapi.co/api/v2/${api}`;
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await axios.get(initialUrl).then(res => {
        if (res.data.results) {
          res.data.results.forEach(async pokemon => {
            await axios.get(pokemon.url).then(data => {
              setPokemonsData(data.data);

            })
          })
        } else {
          setPokemonsData(res.data)
          setNextUrl(res.data.id + 1);
          if (res.data.id > 1) {
            setPrevUrl(res.data.id - 1);
          } else {
            setPrevUrl(res.data.id)
          }
        }
        setLoading(false);
      })
    }
    fetchData();
  }, [initialUrl])
  console.log(pokemonsData)
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
  return (
    // <div></div>
    <div>
      {loading ? <h1>Loading...</h1> : (
        <>
          <Paginations pokemon={''} />
          <Navbar />
          <Searchbar />
          <div className="grid-container">
            {pokemonsData.map((pokemon, i) => {
              console.log(pokemon)
              return (
                <div key={pokemon.id}>
                  {/* <Card pokemon={pokemon} /> */}
                  <div className="btn btn-info" >
                    <a href={'pokemon/' + pokemon.id} key={i}>Read More</a>
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
