import React, { useState, useMemo } from "react";
import kOnzy from "/./public/kOnzy.gif";

export default function SearchResultPractice() {
    //declare states for page updates
    const [input, setInput] = useState("");
    const [filterTypeValue, setFilterTypeValue] = useState("unfiltered");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState([]);

    //declare filterType choices
    const filterTypeOptions =
        ["unfiltered", "gender", "operatingSystem", "model", "behaviorclass"];

    //onSubmit function from form
    function handleSubmit(e) {
        e.preventDefault();
        const keyword = input.trim();
        const searchParams = new URLSearchParams({
            filterType: filterTypeValue,
            keyword: input,
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

    function setNewFilterType(e) {
        setFilterTypeValue(e.target.value);
        return filterTypeValue;
    }

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
        console.log(`unsorted array: ${unsortedArray}`);

        //super nifty, will sort in ascending order easily
        let sortedArray = unsortedArray.sort((a, b) => a - b);

        //rounds down from (sortedArray.length - 1)/2.
        //In the event sortedArray.length is an even number,
        //this will account for the zero-indexing of JS arrays
        //and give us the middle location (which may be odd; 
        //that's why we don't check if middle % 2 === 0)
        const middle = Math.floor((sortedArray.length - 1) / 2);
        console.log(middle);
        //if middle is even, that means we went down from an odd number,
        //which means sortedArray.length / 2 would return a decimal, 
        //which means sortedArray.length is odd
        if (sortedArray.length % 2) {
            med = sortedArray[middle];
            console.log("middle was odd!");
        } else {
            med = ((sortedArray[middle] + sortedArray[middle + 1]) / 2);
            console.log("middle was even!");
        };
        console.log("Median: " + med);
        return Math.trunc(med);
    }

    return (
        <div className="container extend-under-navbar">
            <form onSubmit={(e) => {
                handleSubmit(e);
            }}>
                <p>Select data point to filter search by</p>
                <select className="row-g3"
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
                <input type="text" placeholder="keyword..."
                    value={input}
                    //this does not work without the brackets, 
                    //as React will not prioritize the onChange event
                    //and will cache it for async
                    onChange={(e) => {
                        setInput(e.target.value)
                    }
                    }></input>
                <button type="submit">Submit</button>
            </form>
            {(loading) &&
                <div style={{ display: "flex" }}>
                    <h2>Loading...</h2>
                    <div style={{ position: "relative" }}>
                        <img src={kOnzy} className="gif-load"></img>
                    </div>
                </div>}
            {(!loading & response.length > 0)
                && <h2>Displaying {response.length} records</h2>}
            {(response.length <= 0)
                ? <h2>No records to display</h2>
                : <></>
            }

            <h2>Metrics Display</h2>
            <div className="row custom-card-display">
                <div className="col-3 border custom-card-display">
                    <div type="card" id="appUsageTime">
                        <div className="card-title">
                            <h4 className="card-text" style={{ textAlign:"center" }}>App Usage Per Day (min/day)</h4>
                        </div>
                        <div className="card-body" value="App Usage Time (min/day)">
                            {

                                (response.length > 0)
                                    ? (
                                        <>
                                            <p className="card-text" style={{ textAlign:"center" }}>Average: {calculateAverage("App Usage Time (min/day)")}</p>
                                            <p className="card-text" style={{ textAlign:"center" }}>Median: {calculateMedian("App Usage Time (min/day)")}</p>
                                        </>
                                    ) : <p className="card-text" style={{ textAlign:"center" }}>No Average or Media to display</p>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-3 border">
                    <div type="card" id="appUsageTime">
                        <div className="card-title">
                            <h4 className="card-text" style={{ textAlign:"center" }}>Screen On Time (hours/day)</h4>
                        </div>
                        <div className="card-body" value="Screen On Time (hours/day)">
                            {

                                (response.length > 0)
                                    ? (
                                        <>
                                            <p className="card-text" style={{ textAlign:"center" }}>Average: {calculateAverage("Screen On Time (hours/day)")}</p>
                                            <p className="card-text" style={{ textAlign:"center" }}>Median: {calculateMedian("Screen On Time (hours/day)")}</p>
                                        </>
                                    ) : <p className="card-text" style={{ textAlign:"center" }}>No Average or Media to display</p>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-3 border">
                    <div type="card" id="numberOfAppsInstalled">
                        <div className="card-title">
                            <h4 className="card-text" style={{ textAlign:"center" }}>Number of Apps Installed</h4>
                        </div>
                        <div className="card-body" value="Number of Apps Installed">
                            {

                                (response.length > 0)
                                    ? (
                                        <>
                                            <p className="card-text" style={{ textAlign:"center" }}>Average: {calculateAverage("Number of Apps Installed")}</p>
                                            <p className="card-text" style={{ textAlign:"center" }}>Median: {calculateMedian("Number of Apps Installed")}</p>
                                        </>
                                    ) : <p className="card-text" style={{ textAlign:"center" }}>No Average or Media to display</p>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-3 border">
                    <div type="card" id="age">
                        <div className="card-title">
                            <h4 className="card-text" style={{ textAlign:"center" }}>Age</h4>
                        </div>
                        <div className="card-body" value="Age">
                            {

                                (response.length > 0)
                                    ? (
                                        <>
                                            <p className="card-text" style={{ textAlign:"center" }}>Average: {calculateAverage("Age")}</p>
                                            <p className="card-text" style={{ textAlign:"center" }}>Median: {calculateMedian("Age")}</p>
                                        </>
                                    ) : <p className="card-text" style={{ textAlign:"center" }}>No Average or Media to display</p>
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