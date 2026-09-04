import React, { useState, useEffect } from "react";
import kOnzy from "/kOnzy.gif";
import doggy from "/doggy.jpeg"
import { useCache } from "../contexts/CacheResultsContext";
import useFetch from "../hooks/useFetch";

export default function SearchComponent() {
    //declare states for page updates, keeping this local
    const [input, setInput] = useState("");
    const [filterTypeValue, setFilterTypeValue] = useState("unfiltered");

    //pulling object from useFetch that gives us all vars in that hook
    const { fetchData, setResponse, response, loading, error } = useFetch();

    //this pulls the exact variables from
    //CacheResults Context and allows them to
    //mutate within SearchComponent
    const { cache, setCachedResponse } = useCache(null);

    //declare filterType choices
    const filterTypeOptions =
        ["unfiltered", "gender", "operatingSystem", "model", "behaviorclass"];

    //run when Submit is clicked
    //handles fetch logic with useFetch hook
    async function handleSubmit(e) {
        e.preventDefault();
        //grabbing keyword and filter and setting params
        //before sending off to useFetch
        const searchParams = new URLSearchParams({
            filterType: filterTypeValue,
            keyword: input.trim(),
        });

        const baseURL = `/api/data/search?`;

        fetchData(baseURL, searchParams);
        setInput("");
        setCachedResponse(response);
    }
    //responds to change in filterType selector in the form
    function setNewFilterType(e) {
        setFilterTypeValue(e.target.value);
        return filterTypeValue;
    }
    //keeping these simple math functions local for ease of use;
    //don't want to build external "math" hook that would also be
    //responsible for passing state updates, etc.)
    function calculateAverage(variable) {
        const avg = response.reduce((addFunction, currentItem) => {
            return addFunction + (parseInt(currentItem[variable]) || 0);
        }, 0);
        return Math.trunc(avg / response.length);
    }

    function calculateMedian(variable) {

        let med = 0;
        let unsortedArray = response.reduce((accumulator, currentItem) => {
            accumulator.push(parseInt(currentItem[variable]));
            return accumulator; //returning the array means returning it to the next loop; keeps it an array between loops
        }, []);

        //super nifty, will sort in ascending order easily
        let sortedArray = unsortedArray.sort((a, b) => a - b);

        //rounds down from (sortedArray.length - 1)/2.
        //In the event sortedArray.length is an even number,
        //this will account for the zero-indexing of JS arrays
        //and give us the middle location (which may be odd; 
        //that's why we don't check if middle % 2 === 0)
        const middle = Math.floor((sortedArray.length - 1) / 2);

        //if middle is even, that means we went down from an odd number,
        //which means sortedArray.length / 2 would return a decimal, 
        //which means sortedArray.length is odd
        if (sortedArray.length % 2) {
            med = sortedArray[middle];
            //console.log("middle was odd!");
        } else {
            med = ((sortedArray[middle] + sortedArray[middle + 1]) / 2);
            //console.log("middle was even!");
        };
        return Math.trunc(med);
    }

    //useEffect to call the CacheResultsContext to maintain
    //fetched results, is called whenever response changes
    useEffect(() => {
        setCachedResponse(response);
        //setLocalResponse(response);

    }, [response]);

    // useEffect to log the cache and set response
    // to whatever value is still in cache. This
    // maintains results between page navigation
    useEffect(() => {
        console.log("cache:");
        console.log(cache);
        setResponse(cache);
    }, [])

    //return component layout
    return (
        <div className="container-md">
            <div className="container-md row" id="hold-search-and-doggy">
                <div className="col"><h1 className="display-4 container-fluid">Search Through The Database</h1>

                    <form onSubmit={(e) => {
                        handleSubmit(e);
                    }}>
                        <p>Select data point to filter search by</p>
                        <select className="row-g1 form-select form-select-sm w-50"
                            value={filterTypeValue}
                            onChange={(e) => {
                                setNewFilterType(e);
                            }}>
                            {filterTypeOptions.map((option, index) => (
                                <option key={`${index}`}>{`${option}`}</option>
                            ))}
                        </select>
                        <br></br>
                        <br></br>
                        <input className="form-control w-50" type="text" placeholder="keyword..."
                            value={input}
                            //this does not work without the brackets, 
                            //as React will not prioritize the onChange event
                            //and will cache it for async
                            onChange={(e) => {
                                setInput(e.target.value)
                            }
                            }></input>
                        <button type="submit" className="btn btn-outline-secondary">Submit</button>
                    </form>
                    <br></br>
                    {(loading === true) &&
                        <div className="text-centered" style={{ display: "flex" }}>
                            <h2 className="display-5 align-middle">Loading...</h2>
                            <div className="gif-load align-middle">
                                <img src={kOnzy} className="gif-load align-middle"></img>
                            </div>
                        </div>}
                    {(loading === false & response?.length > 0) &&
                        <h2 className="display-5">Displaying {response?.length} records</h2>}
                    {(response?.length <= 0 & error == "")
                        ? <h2 className="display-5">No records to display</h2>
                        : <></>
                    }
                    {(error != "") &&
                        <h3>Error Encountered! {error}</h3>
                    }
                    <br></br>
                </div>
                {/* The className must include d-flex in order to justify content */}
                <div className="col d-flex justify-content-end">
                    <img src={doggy} className="img-thumbnail" style={{ height: 400 }}></img>
                </div>

            </div>

            <div className="row justify-content-around px-1 mb-5">
                <div className="col-2 mx-1 py-5 border">
                    <div type="card" id="appUsageTime">
                        <div className="card-title">
                            <h4 className="card-text" style={{ textAlign: "center" }}>App Usage Per Day (min/day)</h4>
                        </div>
                        <div className="card-body" value="App Usage Time (min/day)">
                            {

                                (response?.length > 0)
                                    ? (
                                        <>
                                            <p className="card-text" style={{ textAlign: "center" }}>Average: {Intl.NumberFormat("en-US").format(calculateAverage("App Usage Time (min/day)"))} minutes/day</p>
                                            <p className="card-text" style={{ textAlign: "center" }}>Median: {Intl.NumberFormat("en-US").format(calculateMedian("App Usage Time (min/day)"))} minutes/day</p>
                                        </>
                                    ) : <p className="card-text" style={{ textAlign: "center" }}>No Average or Media to display</p>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-2 mx-1 py-5 border">
                    <div type="card" id="appUsageTime">
                        <div className="card-title">
                            <h4 className="card-text" style={{ textAlign: "center" }}>Screen On Time (hours/day)</h4>
                        </div>
                        <div className="card-body" value="Screen On Time (hours/day)">
                            {

                                (response?.length > 0)
                                    ? (
                                        <>
                                            <p className="card-text" style={{ textAlign: "center" }}>Average: {Intl.NumberFormat("en-US").format(calculateAverage("Screen On Time (hours/day)"))} hours/day</p>
                                            <p className="card-text" style={{ textAlign: "center" }}>Median: {Intl.NumberFormat("en-US").format(calculateMedian("Screen On Time (hours/day)"))} hours/day</p>
                                        </>
                                    ) : <p className="card-text" style={{ textAlign: "center" }}>No Average or Media to display</p>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-2 mx-1 py-5 border">
                    <div type="card" id="numberOfAppsInstalled">
                        <div className="card-title">
                            <h4 className="card-text" style={{ textAlign: "center" }}>Number of Apps Installed</h4>
                        </div>
                        <div className="card-body" value="Number of Apps Installed">
                            {

                                (response?.length > 0)
                                    ? (
                                        <>
                                            <p className="card-text" style={{ textAlign: "center" }}>Average: {Intl.NumberFormat("en-US").format(calculateAverage("Number of Apps Installed"))}</p>
                                            <p className="card-text" style={{ textAlign: "center" }}>Median: {Intl.NumberFormat("en-US").format(calculateMedian("Number of Apps Installed"))}</p>
                                        </>
                                    ) : <p className="card-text" style={{ textAlign: "center" }}>No Average or Media to display</p>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-2 mx-1 py-5 border">
                    <div type="card" id="age">
                        <div className="card-title">
                            <h4 className="card-text" style={{ textAlign: "center" }}>Age</h4>
                        </div>
                        <div className="card-body" value="Age">
                            {

                                (response?.length > 0)
                                    ? (
                                        <>
                                            <p className="card-text" style={{ textAlign: "center" }}>Average: {Intl.NumberFormat("en-US").format(calculateAverage("Age"))}</p>
                                            <p className="card-text" style={{ textAlign: "center" }}>Median: {Intl.NumberFormat("en-US").format(calculateMedian("Age"))}</p>
                                        </>
                                    ) : <p className="card-text" style={{ textAlign: "center" }}>No Average or Media to display</p>
                            }
                        </div>
                    </div>
                </div>
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
                    {(response?.length > 0) && (
                        response.map(item => (
                            <tr key={item["User ID"]}>
                                <td>{Intl.NumberFormat("en-US").format(item["User ID"])}</td>
                                <td>{item["Device Model"]}</td>
                                <td>{item["Operating System"]}</td>
                                <td>{Intl.NumberFormat("en-US").format(item["App Usage Time (min/day)"])}</td>
                                <td>{Intl.NumberFormat("en-US").format(item["Screen On Time (hours/day)"])}</td>
                                <td>{Intl.NumberFormat("en-US").format(item["Battery Drain (mAh/day)"])}</td>
                                <td>{Intl.NumberFormat("en-US").format(item["Number of Apps Installed"])}</td>
                                <td>{Intl.NumberFormat("en-US").format(item["Data Usage (MB/day)"])}</td>
                                <td>{Intl.NumberFormat("en-US").format(item["Age"])}</td>
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