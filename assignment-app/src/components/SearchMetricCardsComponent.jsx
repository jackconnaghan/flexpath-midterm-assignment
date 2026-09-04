import React from "react";
import useFetch from "../hooks/useFetch";

export default function SearchMetricCardsComponent({ response, loading }) {

    const dataAreas = [
        ["App Usage Time (min/day)", "min/day"],
        ["Screen On Time (hours/day)", "hrs/day"],
        ["Number of Apps Installed", ""],
        ["Age", ""]
    ];
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

    console.log("Search Metrics Rendering Now:");
    return (
        <div className="row d-flex justify-content-between p-1 b-5 mb-5">
            {dataAreas.map((option, index) => (
                <div className="col-2 mx-1 py-3 flex-fill border position-relative" key={index}>
                    <div type="card" >
                        <div className="card-title border position-sticky top-25 start-25 my-2">
                            <h4 className="flex-fill" style={{ textAlign: "center" }}>{option[0]}</h4>
                        </div>
                        <div className="card-body border position-sticky bottom-0 start-0 end-0">
                            {
                                (response?.length > 0)
                                    ? (
                                        <>
                                            <p className="card-text" style={{ textAlign: "center" }}>Average: {Intl.NumberFormat("en-US").format(calculateAverage(option[0]))} {option[1]}</p>
                                            <p className="card-text" style={{ textAlign: "center" }}>Median: {Intl.NumberFormat("en-US").format(calculateMedian(option[0]))} {option[1]}</p>
                                        </>
                                    ) : <p className="card-text" style={{ textAlign: "center" }}>No Average or Media to display</p>
                            }
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}