import React, { useState, useEffect, useReducer } from "react";
//prob not gonna need this
import useFetch from "../hooks/useFetch";

export default function SearchComponent() {

    const [mockState, setMockState] = useState("");
    const [inputValue, setInputValue] = useState([]);
    const [submitValues, setSubmitValues] = useState({
        textInput: "",
        filterType: "",
    });
    //should probably set up a useReducer for a "submittal" state
    //to consolidate loading and submitted states
    //const [submit, setSubmit] = useState();
    //const [error, setError] = useState(null);
    const [filterSearchValue, setFilterSearchValue] = useState("model");
    const [searchResults, setSearchResults] = useState({
        data: [],
        loading: false,
        error: "",
    });
    const filterTypeOptions = ["unfiltered", "gender", "operatingSystem", "model", "behaviorclass"]

    useEffect(() => {

        async function fetchURL(keyword, filter) {
        //console.log(`Here's that search filter you ordered: ${filterSearchValue}`)
        //console.log(`Here's that input value you ordered: ${inputValue}`);
        try {
            //append search queries to url as query params
            const response = await fetch(`/api/data/search?filterType=${filter}&keyword=${keyword}`);
            //catch if response.ok is false, indicates network request failure
            if (!response.ok) {
                throw new Error("Error! Response was NOT okay!!!")
            }
            console.log("got response, response.ok is true");
            setMockState(response.json());
            console.log(mockState);
            const dataArray = await response.data;
            console.log(`here's that data array you ordered: ${dataArray.json}`);
            setSearchResults({
                //LOTS of fiddling with the data types of 
                //"data" in the state, data from the response,
                //This was unfortunately a large hurdle
                data: dataArray,
                loading: true,
                error: response.error,
            });
        } catch (error) {
            console.log("error encountered in catch block in useEffect");
            //setError(error);
            setSearchResults([]);
            console.log(error);
        }}

        fetchURL(submitValues.textInput, submitValues.filterType);
        //return setLoading(false);
    }, [submitValues]);

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitValues({
            textInput: inputValue,
            filterType: filterSearchValue,
        });
        setInputValue("");
    }


    return (
        <div>
            <div className="filter-and-keyword-container container">
                <form onSubmit={handleSubmit}>

                    <p>Select data point to filter search by</p>
                    <select className="row-g3"
                        value="filterSearchValue"
                        onChange={(e) => {
                            console.log(filterSearchValue)
                            setFilterSearchValue(e.target.value)
                        }}>
                        {/* Mapping through the options makes sure
                    we won't have to manually add new tags for every
                    new option. See code later below for a manual way.*/}
                        {filterTypeOptions.map((line, index) => (
                            <option key={`${line}-${index}`}>{line}</option>
                        ))}
                        {/* <option value="model">Model</option>
                    <option value="gender">Gender</option>
                    <option value="operatingSystem">Operating System</option>
                    <option value="behaviorClass">Behavior Class</option>*/}
                    </select>
                    <br></br>
                    <br></br>
                    <p>Search a keyword</p>
                    <input type="text" placeholder="search by keyword..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}></input>
                    <br></br>
                    <button type="submit">Search</button>
                </form>
            </div>
            <div id="are-records-displayed?" className="lead custom-lead">
                {/* cute lil ternary operator for yall */}
                {(searchResults.data == [] || searchResults.data === null) 
                ? <p>No Records To Display.</p>
                : <p>Displaying {searchResults.data}</p>}
            </div>
            <div id="results-container container">
                <div id="boxed-results"></div>
            </div>
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
                        {(searchResults.ok) 
                        // ? searchResults.data.map((line, index) => (
                        //     <tr key={index}>
                        //         <td key={line}>{line}</td>
                        //     </tr>
                        // ))
                        ? <tr>data received! {searchResults.data}</tr>
                        : <tr>{searchResults.error}</tr>}
                </tbody>
            </table>
        </div>
    );
}