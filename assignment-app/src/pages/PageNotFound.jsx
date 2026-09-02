import React, { useState } from "react";
import freakyBug from "/public/freakyBug.jpg";

function PageNotFound() {

    //For all pages, I will be doing the formatting and logic
    //of the content before worrying about css. So things may 
    //get hairy.

    return (
        <div className="container-flex extend-under-navbar" style={{ alignItems: "center", justifyContent: "center" }}>
            <h1 style={{ textAlign: "center" }}>Oops! Page Not Found!</h1>
            {/* display: "block" makes the image a block container
            and allows freer movement in this case. So I made him centered
            because he is the center of attention */}
            <a href="https://en.wikipedia.org/wiki/Lixus_concavus">
                <img src={freakyBug} 
                style={{ display: "block", margin: "0 auto", height: 330 }}
                ></img>
            </a>
            <h6 className="containter .funky-text" style={{ textAlign: "center" }}>Click Him.</h6>
        </div>

    );
}

export default PageNotFound;