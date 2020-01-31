import React, { useState } from "react";
import ReactDOM from "react-dom";

function Paginations(props) {
    // console.log(fetch('https://pokeapi.co/api/v2/pokemon'))
    const pages = [props.page];
    const numrows = props.page + 3;
    for (var i = 1; i < numrows; i++) {
        pages.push(props.page + i)
        if ((props.page - i) < 0) {
            continue
        }
        pages.push(props.page - i)
    }
    pages.sort((a, b) => a - b)
    return (
        <div className="pagination-centered">
            <nav aria-label="Page navigation example" >
                <ul className="pagination text-center ">
                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                    {pages.map(page => {
                        return <li key={page} className={`page-item ${page == props.page ? 'active' : ''}`}><a onClick={() => props.somePage(page)} className="page-link" href="#">{page + 1}</a></li>
                    })}
                    <li className="page-item"><span onClick={() => props.somePage(props.page + 1)} className="page-link" href="#">Next</span></li>
                </ul>
            </nav>
        </div>
    );
}
export default Paginations;