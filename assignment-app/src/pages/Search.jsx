import React from "react";
import SearchComponent from "../components/SearchComponent";
import SearchResults from "../components/SearchResults";
import SearchResultsPractice from "../components/SearchResultsPractice";

export default function Search() {


    return (
        <div className="container extend-under-navbar">
            <SearchComponent />
            {/* <SearchResults /> */}
        </div>
    )
}