import React from 'react';
import './style.css';

export default function ShortInfo(props) {
    return (
        <div className="Card__info">
            <table>
                <thead>
                    <tr>
                        <th>Weight</th>
                        <th>Height</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.weight}</td>
                        <td>{props.height}</td>
                    </tr>
                </tbody>
            </table>

            <div className="Card__data Card__data__ability">
                <p className="title"> Ability </p>
                {props.abilities.map((ability, i) => {
                    return (

                        <p className="Card__data__ability__info" key={i}>
                            {' '}{ability.ability.name}
                        </p>
                    )
                })}
            </div>
        </div>
    );
}