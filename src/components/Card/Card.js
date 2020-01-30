import React, { useState, useEffect } from 'react';
import Slider from './Slider';
import Name from './Name';
import Type from './Type';
import ShortInfo from './ShortInfo'
import { PokemonData } from '../../services/pokemon'
import './Style.css';

function Card({ pokemon }) {
    const [pokemonData, setPokemonData] = useState(null)
    useEffect(() => {
        PokemonData(pokemon)
            .then(body => {
                setPokemonData(body)
            });
    });
    if (!pokemonData) {
        return ""
    }
    return (

        <div key={pokemonData.id}>
            <div className="card" key={pokemonData.id}>
                <Slider pokemonImg={pokemonData.sprites} id={pokemonData.id} autoplay={false} />
                <div className="card-body">
                    <Name name={pokemonData.name} />
                    <Type type={pokemonData.types} />
                    <ShortInfo weight={pokemonData.weight} height={pokemonData.height} abilities={pokemonData.abilities} />
                </div>
            </div>
        </div>

    )
}
export default Card;