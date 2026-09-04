import React from "react";
import SearchComponent from "../components/SearchComponent";
import SearchResults from "../components/SearchResults";
import SearchResultsPractice from "../components/SearchComponent";
import { CacheProvider } from "../contexts/CacheResultsContext";

export default function Search() {


    return (
        <div className="container extend-under-navbar">
                <SearchComponent />
                {/* <SearchResults /> */}
        </div>
    )
}