//getting away from the hustle and bustle of SearchComponent
//to practice the response fetching
import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";

export default function SearchResultPractice() {

    const [input, setInput] = useState("");
    //const [submitValue, setSubmitValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [mockResponse, setMockResponse] = useState([]);
    const [advancedMockResponse, setAdvancedMockResponse] = useState({
        data: [],
        //loading: false,
        error: "",
    });
    // let baseUrl = `/api/data/search`;


    // useEffect(() => {

    //     async function fetchData() {
    //     //this fetch call hardcodes the filterType and keyword
    //     //it will always return the same API endpoint with the 
    //     //same params
    //     let response = await fetch(`api/data/search?filterType=gender&keyword=${input}`);
    //     let responseData = await response.json();
    //     setMockResponse(responseData.toArray);
    //     console.log(responseData);
    //     setAdvancedMockResponse({
    //         data: responseData,
    //         //loading: response.loading
    //         error: response.error,
    //     });
    //     };

    //     fetchData();
    // }, [submitValue]);

    function handleSubmit(e) {
        e.preventDefault();
        // let internalInput = input;
        // console.log(`submitValue before setLoading(true): ${submitValue}`);
        // console.log(`internalInput: ${internalInput}`);
        // setLoading(true);
        // console.log(`submitValue before setSubmitValue(input): ${submitValue}`);
        // console.log(`input before setSubmitValue(input): ${input}`)
        // setSubmitValue(internalInput);
        // console.log(`submitValue after setSubmitValue(internalInput)(""): ${submitValue}`);
        // //setInput("");
        // // let url = new URL(baseUrl);
        // let url = `api/data/search/?filterType=gender&keyword=${submitValue}`;

        setLoading(true);
        //let internalInput = input;
        //setInput("");
        //setSubmitValue(input);

        //I've been trying to figure out why my search is not 
        // returning a filtered array based on the keyword.
        // I've turned to the encodeURIComponent hoping it will help.
        // It seems to accomplish the same thing as inline brackets
        const url = `/api/data/search?filterType=gender&keyword=${input}`;

        // url.searchParams.append("filterType", "gender");
        // url.searchParams.append("keyword", input);
        async function fetchData() {
            //this fetch call hardcodes the filterType and keyword
            //it will always return the same API endpoint with the 
            //same params
            //let url = `api/data/search?filterType=gender&keyword=${submitValue}`;
            //let url = `api/data/search?filterType=gender&keyword=`;
            try {
                console.log(url);
                let response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }
                console.log(response.ok);
                console.log(response);
                let responseData = await response.json();
                setMockResponse(responseData);
                console.log(`mockResponse length: ${mockResponse.length}`);
                console.log(`mockResponse: ${mockResponse}`);
                setAdvancedMockResponse({
                    data: responseData,
                    //loading: response.loading
                    error: response.error,
                });
            } catch (error) {
                console.error(`Fetch error: ${error}`);
            } finally {
                setLoading(false);
            }

        };

        fetchData();
        console.log(`Keyword sent as param: ${input}`);
        setInput("");


        //setSubmitValue("");
        //console.log(`input at end of handleSubmit: ${input}`);


    }
    return (
        <div className="container extend-under-navbar">
            <h1>Practice the Search Function</h1>
            <p>This page tests a default call to the api</p>
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
            <h2>Basic Output</h2>
            {(loading === true)
                ? <h3>Loading...</h3>
                : <></>}
            {(mockResponse)
                ? <p>Here's that mock data you ordered: {mockResponse.Array}</p>
                : <p>Mock Data not Return! Take Day Off!</p>
            }
            <br></br>
            <h2>Advanced Output</h2>
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
                {/* <tbody>
                    {(advancedMockResponse)
                        ? advancedMockResponse.data?.map((line, index) => (
                            <tr key={index}>
                                 <td key={line}>{line}</td>
                            </tr> 
                            ))
                        : <p>No data to display</p>
                    }
                </tbody> */}
            </table>
        </div>

    );
}