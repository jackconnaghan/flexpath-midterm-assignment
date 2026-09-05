import React from "react";
import ErrorBoundary from "./ErrorBoundary";


export default function ErrorResponder({error}) {

    const errorCode = error.code || "Error unknown.";

    return (
        <div className="error-container">
            <h2 className="">An error occurred:</h2>
            <h2 className="error-text">{error}</h2>
            <h4>{error.code}</h4>
        </div>
    )
}