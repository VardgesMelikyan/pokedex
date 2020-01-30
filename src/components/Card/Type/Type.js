import React from 'react';
import typeColors from '../../../Helper/pokemonTypes';
import './style.css';

function Type(params) {
    return (
        <div className="Card__types row d-flex justify-content-around">
            {
                params.type.map((type, i) => {
                    return (
                        <div key={type.type.name}>
                            <div className="col-md" key={i}>
                                <span> <a style={{ backgroundColor: typeColors[type.type.name] }} className="btn btn-primary" href={`/type/${type.type.name}`}>{type.type.name} </a></span>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}
export default Type;