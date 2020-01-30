import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { PokemonData } from '../../services/pokemon'
import './style.css';

function Searchbar() {
    const animatedComponents = makeAnimated();
    const [selectedOption, setSelectedOption] = useState(null)
    const [typeFilter, setTypeFilter] = useState([]);
    useEffect(() => {
        PokemonData('https://pokeapi.co/api/v2/type')
            .then(body => {
                setTypeFilter(filterData(body.results))
            });
    }, []);
    const filterData = (data) => {
        data.forEach(d => {
            d.label = d.name
            d.value = d.url
            delete d.name
            delete d.url
        })
        return data
    }

    const handleChange = (selectedOption) => {
        setSelectedOption({ selectedOption });
        // console.log(`Option selected:`, selectedOption);
    }

    // const { selectedOption } = setSelectedOption;


    return (
        <div>
            <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={''}
                onChange={() => handleChange()}
                placeholder="Filter"
                isMulti
                options={typeFilter}
            />
        </div>
    );
}

export default Searchbar;