import React, { useState, Component } from "react";
import ReactDOM from "react-dom";
import PaginacionTabla from "./PaginacionTabla";

function Paginations() {
    return (
        <table className="table table-hover">
            <PaginacionTabla
                itemsperpage={10}
                nocolumns={20}
                items={[]}
                pagesspan={4}
            />
        </table>
    );
}
export default Paginations;