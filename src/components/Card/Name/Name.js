import React from 'react';
import './style.css';

function Name(name) {
    return (
        <div className="h2 d-flex justify-content-around">
            <h5 className="card-title"><a className="text-uppercase" href={`/pokemon/${name.name}`} >{name.name}</a></h5>
        </div>
    );
}

export default Name;