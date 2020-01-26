import React from 'react';
import './style.css';

function Name(name) {
    return (
        <div className="Card__name">
            {name.name}
        </div>
    );
}

export default Name;