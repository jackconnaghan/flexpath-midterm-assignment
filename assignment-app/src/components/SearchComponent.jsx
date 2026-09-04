import React, { useState, useEffect } from "react";
import kOnzy from "/kOnzy.gif";
import scaredyDog from "/scaredyDog.jpeg"
import { useCache } from "../contexts/CacheResultsContext";
import useFetch from "../hooks/useFetch";
import SearchMetricCardsComponent from "./SearchMetricCardsComponent";
import SearchTableComponent from "./SearchTableComponent";

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
        if (Array.isArray(cache)) {
            setResponse(cache);
        }
        //setResponse is a variable that can be "watched", so watch for it running.
        //This useEffect was changed to allow the "No data to display" tag to render successfully,
        //as the ternary expression "cache != null" evaluates to true as soon as the cache is updated.
        //AND AND AND cache being set to an array by default makes other things break. For...
        // ........some reason.
    }, []);

    // The following is some silliness to enable a fun easter egg 
    // (and reach the "exceeding expectations" tier of the project grade).
    // handleDragStart is called when the image, which is only displayed
    // with a certain text input, is dragged.

    // e.dataTransfer.setData takes two params:
    // (dataFormat, attributeName). It sets the DragData object 
    // to a "text/plain" type attribute and sets that "text/plain" type 
    // attribute to the target HTML section's alt text.
    const handleDragStart = (e) => {
        e.dataTransfer.setData("text/plain", e.target.alt)
    }
    //This function once again prevents default before
    // creating a new variable "droppedAltText" which runs the getData 
    // function on the dataTransfer object of e. This places the 
    // value of dataTransfer's attribute "text/plain" in droppedAltText.
    const handleDrop = (e) => {
        e.preventDefault();
        setFilterTypeValue("model");
        setInput(e.dataTransfer.getData('text/plain'));
    }
    //return component layout
    console.log(response?.length);
    return (
        <div className="container m-0">
            <div className="row m-4" id="hold-search-and-doggy">
                <h1 className="display-4 p-0">Search Through The Database</h1>
                <div className="col-8">
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

                            }
                            onDrop={(e) => {
                                //handleInputValueClear;
                                handleDrop(e);
                            }}></input>
                        <br></br>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    <br></br>
                    {/* BE CAREFUL WITH && as it can return a 0 that just gets rendered for free
                    He gets in. He gets it done. He leaves. */}
                    {(loading && !error) &&
                        <div className="text-centered" style={{ display: "flex" }}>
                            <h2 className="display-5 align-middle">Loading...</h2>
                            <div className="gif-load align-middle">
                                <img src={kOnzy} className="gif-load align-middle"></img>
                            </div>
                        </div>}
                    {(!loading && response?.length > 0) ? (
                        <h2 className="display-5">Displaying {response?.length} records:</h2>
                        ) : (
                        <h2 className="display-5">No records to display</h2>)
                        }
                    {(error != "") &&
                        <h3>Error Encountered! {error}</h3>
                    }
                    <br></br>
                </div>
                {/* The className must include d-flex in order to justify content */}
                <div className="col-4 d-flex justify-content-middle">
                    <img src={scaredyDog} className="img-thumbnail" style={{ objectFit: "contain", aspectRatio: 1, height: 300 }}
                        draggable="true"
                        alt="Pupper Phone 31"
                        onDragStart={handleDragStart}
                        onDrop={() => {
                            //handleInputValueClear;
                            handleDrop();
                            setFilterTypeValue("model");
                            console.log(filterTypeValue);
                        }}></img>
                </div>

            </div>
            {/* Include response as a prop for SMCC to keep
            the value of response the same between comps.
            DO NOT call useFetch again! Doing that will create a new
            response object! I dont wanna do that */}
            <SearchMetricCardsComponent response={response} loading={loading} />
            <SearchTableComponent response={response} />

        </div>

    );
}