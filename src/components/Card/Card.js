import React, { useState, useEffect } from 'react';
import FsLightbox from 'fslightbox-react';
import typeColors from '../../Helper/pokemonTypes';
import { ByType } from '../../App';
import 'react-awesome-slider/dist/styles.css';
import './Style.css';

function Card({ pokemon, full = '' }) {
    console.log(pokemon)
    const [toggler, setToggler] = useState(false);
    return (
        <div>
            {full ?
                < div className="Card" key={pokemon.id}>
                    <img onClick={() => setToggler(!toggler)} src={pokemon.sprites.front_default} className="center" />
                    <FsLightbox
                        toggler={toggler}
                        sources={[
                            `${pokemon.sprites.front_default}`,
                            `${pokemon.sprites.back_default}`,
                            `${pokemon.sprites.front_shiny}`,
                            `${pokemon.sprites.back_shiny}`
                        ]}
                    />

                    <h1 className="Card__name">
                        {pokemon.name}
                    </h1>
                    <div className="Card__types">
                        {pokemon.types.map((type, i) => {
                            return (
                                <div className="Card__type" key={i} style={{ backgroundColor: typeColors[type.type.name] }}>
                                    <span> {type.type.name} </span>
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
                        <div className="Card__data Card__data__stats">
                        <p className="title"> Stats </p>
                        {pokemon.stats.map((stat, i) => {
                                return (

                                    <div className="Card__data__stat_info" key={i}>
                                    <span>{stat.stat.name} :</span> <span>{stat.base_stat}</span> 
                                    </div>
                                )
                            })}
                        </div>
                        <div className="Card__data Card__data__moves">
                        <p className="title"> Moves </p>
                        {pokemon.moves.map((move, i) => {
                                return (

                                    <div className="Card__data__move__info" key={i}>
                                    <span>{move.move.name}</span> 
                                    </div>
                                )
                            })}
                        </div>                        
                        <div className="Card__data Card__data__ability">
                            <p className="title"> Ability </p>
                            {pokemon.abilities.map((ability, i) => {
                                return (

                                    <div className="Card__data__ability__info" key={i}>
                                    <div className="tooltip"> {' '}{ability.ability.name}
                                      <span className="tooltiptext"> fff </span>
                                    </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div >
                : (
                    <>


                        < div className="Card" key={pokemon.id}>
                            <img onClick={() => setToggler(!toggler)} src={pokemon.sprites.front_default} className="center" />
                            <FsLightbox
                                toggler={toggler}
                                sources={[
                                    `${pokemon.sprites.front_default}`,
                                    `${pokemon.sprites.back_default}`,
                                    `${pokemon.sprites.front_shiny}`,
                                    `${pokemon.sprites.back_shiny}`
                                ]}
                            />

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
                    </>
                )}
        </div>
    )
}
export default Card;