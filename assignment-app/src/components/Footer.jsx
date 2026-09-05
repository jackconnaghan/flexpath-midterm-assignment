import React from "react";
import freakyBug from "/public/freakyBug.jpg";

//export default function Footer() {

export default class Footer extends React.Component {

    render() {
        return (
            <div className="long-container flex">
                <footer className="custom-footer d-flex flex-wrap justify-content-center align-items-center py-3 my-4 border-top">
                    <small className="col-8 d-flex custom-footer-text">So this is the footer Hi I'm the footer! Hai</small>
                    <img className="bi freaky-bug" src={freakyBug} alt="freaky bug with the snout lookin a fool">
                    </img>
                </footer>
            </div>
        );
    }
}