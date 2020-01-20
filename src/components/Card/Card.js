import React, { useState, useEffect } from 'react';
import './Style.css';
import AwesomeSlider from 'react-awesome-slider';
import typeColors from '../../Helper/pokemonTypes';
import 'react-awesome-slider/dist/styles.css';
import { ByType } from '../../App';
function Card({ pokemon }) {
    return (
        < div className="Card" key={pokemon.id}>
            <AwesomeSlider bullets={false}>
                <div data-src={pokemon.sprites.front_default} />
                <div data-src={pokemon.sprites.back_default} />
                <div data-src={pokemon.sprites.front_shiny} />
                <div data-src={pokemon.sprites.back_shiny} />
            </AwesomeSlider>
            <div className="Card__name">
                {pokemon.name}
            </div>
            <div className="Card__types">
                {pokemon.types.map((type, i) => {
                    return (
                        <div className="Card__type" key={i} style={{ backgroundColor: typeColors[type.type.name] }}>
                            <button onClick={() => ByType(`${type.type.url}`)}> {type.type.name} </button>
                        </div>
                    )
                })}
            </div>
            <div className="Card__info">
                <div className="Card__data Card__data__weight">
                    <p className="title"> Weight </p>
                    <p>{pokemon.weight}</p>
                </div>
                <div className="Card__data Card__data__height">
                    <p className="title"> Height </p>
                    <p>{pokemon.height}</p>
                </div>
                <div className="Card__data Card__data__ability">
                    <p className="title"> Ability </p>
                    {pokemon.abilities.map((ability, i) => {
                        return (

                            <p className="Card__data__ability__info" key={i}>
                                {' '}{ability.ability.name}
                            </p>
                        )
                    })}
                </div>
            </div>
        </div >
    )
}
export default Card;