import React from 'react';
import Slider from '../Slider';
import Name from '../Name';
import Type from '../Type';
import ChartsPage from './Charts'
import Card from '../../Card'
import './style.css';

function SingleCard(props) {
    const data = props.pokemon
    if (!props.pokemon) {
        return
    }
    const randomCard = () => {
        let url = 'https://pokeapi.co/api/v2/pokemon/'
        return url + Math.floor(Math.random() * (1000 - 1 + 1) + 1)
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md">
                    <a href={`${data.id !== 1 ? data.id - 1 : ''}`} onClick={() => props.prev()} className="btn btn-primary">Prev</a>
                </div>
                <div className="col-md">
                    <a href={`${data.id + 1}`} onClick={() => props.next()} className="btn btn-primary">Next</a>
                </div>
            </div>
            <Name name={data.name} pokemonId={data.id} />
            <div className="row">
                <div className="col-md-4">
                    <Slider pokemonImg={data.sprites} id={data.id} autoplay={true} />
                    <Type type={data.types} />
                </div>
                <div className="col-md-8">
                    <ChartsPage stats={data.stats} height={data.height} weight={data.weight} />
                </div>
            </div>
            <div className="row">
            </div>
            <hr />
            <div className="row">
                <div className="col-md-4">
                    <Card pokemon={randomCard()} />
                </div>
                <div className="col-md-4">
                    <Card pokemon={randomCard()} />
                </div>
                <div className="col-md-4">
                    <Card pokemon={randomCard()} />
                </div>
            </div>
        </div>
    );
}
export default SingleCard;