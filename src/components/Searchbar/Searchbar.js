import React from 'react';
import './style.css';

function Searchbar() {
    return (
        <div className="Searchcover">
            <form>
                <div className="tb">
                    <div className="td"><input type="text" /></div>
                    <div className="td s-cover" >
                        <button type="submit">
                            <div className="s-circle"></div>
                            <span></span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Searchbar;