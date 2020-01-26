import React from 'react';
import Slider from './Slider';
import Name from './Name';
import Type from './Type';
import ShortInfo from './ShortInfo'
import './Style.css';

function Card({ pokemon }) {
    return (
        <div>
            <div className="Card" key={pokemon.id}>
                <Slider pokemonImg={pokemon.sprites} id={pokemon.id} autoplay={false} />
                <Name name={pokemon.name} />
                <Type type={pokemon.types} />
                <ShortInfo weight={pokemon.weight} height={pokemon.height} abilities={pokemon.abilities} />
            </div>
        </div>
    )
}
export default Card;