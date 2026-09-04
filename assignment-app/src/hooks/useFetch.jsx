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
        // for (let i = 0; i <= 100000000; i++) {}
        try {
            console.log(url);
            let response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            // console.log(response.ok);
            // console.log(response);
            let responseData = await response.json();

            setResponse(responseData);
            // console.log(responseData);
            //responseData.map(datum => {console.log(datum)});
            console.log(`response length: ${responseData.length}`);
            //setCachedResponse(responseData);
            //console.log(cache);
            setLoading(false);
        } catch (error) {
            //even though error is a boolean when it's declared,
            //setting it to a string works just fine. Who knows 
            //why. I didn't build react
            setError(error.message);
            console.error(`Fetch error: ${error}`);
            setLoading(false);
        }
        return { loading };
    }


    return ({
        fetchData,
        response,
        loading,
        error,
    });
}