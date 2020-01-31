import React from 'react';
import './style.css';

function Name(props) {
    return (
        <div className="h2 d-flex justify-content-around">
            <h5 className="card-title"><a className="text-uppercase" href={`/pokemon/${props.pokemonId}`} >{props.name}</a></h5>
        </div>
    );
}

export default Name;