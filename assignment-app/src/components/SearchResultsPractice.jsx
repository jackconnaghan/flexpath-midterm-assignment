//getting away from the hustle and bustle of SearchComponent
//to practice the response fetching
import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import kOnzy from "/./public/kOnzy.gif"

export default function SearchResultPractice() {

    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        const keyword = input.trim();
        const searchParams = new URLSearchParams({
            filterType: "operatingsystem",
            keyword,
        });

        setLoading(true);

        const url = `/api/data/search?${searchParams.toString()}`;

        async function fetchData() {
            try {
                console.log(url);
                let response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }
                console.log(response.ok);
                console.log(response);
                let responseData = await response.json();

                setResponse(responseData);
                console.log(responseData);
                //responseData.map(datum => {console.log(datum)});
                console.log(`response length: ${responseData.length}`);
            } catch (error) {
                console.error(`Fetch error: ${error}`);
            } finally {
                setLoading(false);
            }

        };

        //simulate loading time
        setTimeout(() => {
            fetchData();
        console.log(`Keyword sent as param: ${keyword}`);
        setInput("");
        }, 1500);

    }
    return (
        <div className="container extend-under-navbar">
            <h1>Practice the Search Function</h1>
            <p>This page tests a default call to the api</p>
            <p>The filterType is hardcoded as "operatingsystem",
                so try using keywords like "android".
            </p>
            <form onSubmit={(e) => {
                handleSubmit(e);
            }
            }>
                <input type="text" placeholder="keyword..."
                    value={input}
                    //this does not work without the brackets
                    onChange={(e) => {
                        setInput(e.target.value)
                    }
                    }></input>
                <button type="submit">Submit</button>
            </form>
            {(loading) && 
                <div style={{display:"flex"}}>
                    <h2>Loading...</h2>
                    <div style={{position:"relative"}}>
                        <img src={kOnzy} className="gif-load"></img>
                    </div>
                </div>}
            {(!loading & response.length > 0) 
                && <h2>Showing {response.length} results</h2>}
            {(response.length <= 0)
                ? <h2>No data to display</h2>
                : <></>
            }
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">User ID</th>
                        <th scope="col">Device Model</th>
                        <th scope="col">Operating System</th>
                        <th scope="col">App Usage Time (min/day)</th>
                        <th scope="col">Screen On Time (hours/day)</th>
                        <th scope="col">Battery Drain (mAh/day)</th>
                        <th scope="col">Number of Apps Installed</th>
                        <th scope="col">Data Usage (MB/day)</th>
                        <th scope="col">Age</th>
                        <th scope="col">Gender</th>
                        <th scope="col">User Behavior Class</th>
                    </tr>
                </thead>
                <tbody>
                    {(response.length > 0) && (
                        response.map(item => (
                            <tr key={item["User ID"]}>
                                <td>{item["User ID"]}</td>
                                <td>{item["Device Model"]}</td>
                                <td>{item["Operating System"]}</td>
                                <td>{item["App Usage Time (min/day)"]}</td>
                                <td>{item["Screen On Time (hours/day)"]}</td>
                                <td>{item["Battery Drain (mAh/day)"]}</td>
                                <td>{item["Number of Apps Installed"]}</td>
                                <td>{item["Data Usage (MB/day)"]}</td>
                                <td>{item["Age"]}</td>
                                <td>{item["Gender"]}</td>
                                <td>{item["User Behavior Class"]}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>

    );
}