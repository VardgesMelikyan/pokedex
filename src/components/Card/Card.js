import React, { useState, useEffect } from 'react';
import './Style.css';
import FsLightbox from 'fslightbox-react';
import typeColors from '../../Helper/pokemonTypes';
import 'react-awesome-slider/dist/styles.css';
import { ByType } from '../../App';
function Card({ pokemon }) {
    const [toggler, setToggler] = useState(false);
    return (
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
    )
}
export default Card;