import React from "react";

export default function Header() {

    return (
        <header style={{backgroundColor:"#81ba4c", borderStyle:"solid", borderColor:"coral", borderWidth:8}} className="d-flex flex-wrap justify-content-center align-items-center py-3 my-4 border-top">
            <p>So this is the header</p>
            <p>Welcome!</p>
        </header>
    );
}