import React from "react";
import freakyBug from "/public/freakyBug.jpg";

//export default function Footer() {

export default class Footer extends React.Component {

    render() {
        return (
            <div className="long-container flex">
                <footer style={{backgroundColor:"#81ba4c", borderStyle:"solid", borderColor:"coral", borderWidth:8}} className="d-flex flex-wrap justify-content-center align-items-center py-3 my-4 border-top">
                    <small className="col-md-4 d-flex align-items-left mb-3 mb-md-0 text-body-secondary" style={{color:"yellow"}}>So this is the footer Hi I'm the footer! Hai</small>
                    <img className="bi" style={{ display: "flex", alignItems: "right", height: 50 }} src={freakyBug} alt="freaky bug with the snout lookin a fool">
                    </img>
                </footer>
            </div>
        );
    }
}