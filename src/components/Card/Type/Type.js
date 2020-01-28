import React from 'react';
import typeColors from '../../../Helper/pokemonTypes';
import TypeInfo from './TypeInfo';
import './style.css';

function Type(params) {
    return (
        <div className="Card__types">
            {
                params.type.map((type, i) => {
                    return (
                        <div className="Card__type" key={i} style={{ backgroundColor: typeColors[type.type.name] }}>
                            <span > {type.type.name} </span>
                            <TypeInfo dataSrc={type.type.url} />
                        </div>
                    )
                })
            }
        </div>
    );
}
export default Type;