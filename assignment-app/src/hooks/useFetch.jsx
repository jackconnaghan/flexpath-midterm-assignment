import React, { useState, useEffect } from "react";

//for my next trick, I will create a custom hook
//to take care of fetching data from the server
export default function useFetch() {

    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    async function fetchData(baseURL, searchParams) {
        //sets error to false in case the last submission attempt
        //failed
        setLoading(true);
        setError(false);

        const url = `${baseURL}${searchParams.toString()}`
        //setting the setTimeout promise in this way
        //bypasses having to set the setTimeout around the try/catch
        // block, which wouldn't work anyway due to rules of hooks
        await new Promise((resolve) => setTimeout(resolve, 1500));

        try {
            console.log(url);
            //the awaited Promise outside the try block
            //is still running, so the await fetch 
            //request has to wait until resolve
            //runs after 1500 mili
            let response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            let responseData = await response.json();
            setResponse(responseData);
            console.log(`response length: ${responseData.length}`);
            
            setLoading(false);
        } catch (error) {
            //even though error is a boolean when it's declared,
            //setting it to a string works just fine. Who knows 
            //why. I didn't build react
            setError(error.message);
            console.error(`Fetch error: ${error}`);
            setLoading(false);
        }
    }

    // Passing setResponse allows me to call it within SearchComponent,
    // which allows me to set the response (what is rendered)
    // to whatever was set in "cache" without holding a 
    // "localResponse" variable (confusing and clunky)
    return ({
        fetchData,
        setResponse,
        response,
        loading,
        error,
    });
}