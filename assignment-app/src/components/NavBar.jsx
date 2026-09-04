import React from "react";
import { Link, Route, Routes, Router } from "react-router-dom";
import Home from "../pages/Home";
import SearchComponent from "./SearchComponent";

export default function NavBar() {

    return (
        <div className="">
            {/* <h1>Hidden Search Page to Simulate Padding</h1> */}
            <nav className="navbar navbar-dark bg-dark fixed-top flex-gap"
                style={{ alignItems: "center", padding:"16px 16px", justifyContent: "left"}}>
                <a className="navbar-brand">User Behavior Data</a>
                <Link to={"/"}>Home</Link>|||
                <Link to={"search"}>Search Dataset</Link>|||
                

            </nav>
            {/* Regarding these breaks: The internet's solution
            to keep a position:fixed HTML React component from covering 
            other components that render at the top of the page is 
            to add a padding attribute to the covered elements. Since that
            would involve adjusting each component in the project,
            and is pretty hokey anyway,
            I opted to add breakpoints below to simulate the effect. */}
            {/* <br></br>
            <br></br>
            <br></br> */}
        </div>
    )
}