import React, { useState, useEffect } from "react";

export default function useFetch(filterType, keyword) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchURL() {
            try {
                setLoading(true);
                const response = await fetch(`/api/data/search?filterType=${filterType}&keyword=${keyword}`);
                if (!response.ok) {
                    throw new Error("Error! Response was NOT okay!");
                }
                console.log(response);
                setData(await response.json());
            } catch (error) {
                setError(`Error Spotted: ${error.message}`);
                setData("");
            }
            setLoading(false);
        }
        fetchURL();
    }, []);

    // if (loading) return <div>Loading data...</div>;
    // if (error) return <div>{error}</div>
    // if (!data) return null;

    return {
        data,
        loading,
        error,
    };


}