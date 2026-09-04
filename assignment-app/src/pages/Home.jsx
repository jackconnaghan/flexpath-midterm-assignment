import React, { useState } from "react";
import hypno from "/hypnoGif.gif";

function Home() {

    //For all pages, I will be doing the formatting and logic
    //of the content before worrying about css. So things may 
    //get hairy.

    return (
        <div className="container extend-under-navbar">
            <h1 className="display-4 p-0">User Behavior Dataset
                <small className="display-6 text-muted" > (But Different...)</small>
            </h1>
            <p>This dataset provides a comprehensive analysis of mobile device usage patterns and user behavior classification. It contains 700 samples of user data, including metrics such as app usage time, screen-on time, battery drain, and data consumption. Each entry is categorized into one of five user behavior classes, ranging from light to extreme usage, allowing for insightful analysis and modeling.</p>
            <div className="row">
                <div className="col">
                    <h1 className="display-4 p-0">Key Features</h1>
                    <ul>
                        <li>User ID: Unique Identifier for each user.</li>
                        <li>Device Model: Model of the user's smartphone.</li>
                        <li>Operating System: The OS of the device (iOS or Android).</li>              <li>App Usage Time: Daily time spent on mobile applications, measured in minutes.</li>
                        <li>Battery Drain: Daily battery consumption in mAh.</li>
                        <li>Number of Apps Installed: Total apps available on the device.</li>
                        <li>Data Usage: Daily mobile data consumption in megabytes.</li>
                        <li>Age: Age of the user.</li>
                        <li>Gender: Gender of the user (Male or Female).</li>
                        <li>User Behavior Class: Classification of user behavior based on usage patterns (1 to 5).</li>
                    </ul>
                    <a className="d-flex row" href="https://www.kaggle.com/datasets/valakhorasani/mobile-device-usage-and-user-behavior-dataset?resource=download"
                    >Sourced from this Kaggle Dataset</a>
                    <br></br>
                </div>
                <div className="col d-flex justify-content-end">
                    <img src={hypno} className="w-75 h-75 p-0" alt="hypnotizing gif (you are feeling very sleepy)"></img>
                </div>

            </div>

        </div>

    );
}

export default Home;