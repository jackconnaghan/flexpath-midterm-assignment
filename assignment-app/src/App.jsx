import React, { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SearchResults from "./pages/Search";
//import Search from "./components/SearchComponent";
import NavBar from "./components/NavBar";
import PageNotFound from "./pages/PageNotFound";
import SearchComponent from "./components/SearchComponent";
import { CacheProvider } from "./contexts/CacheResultsContext";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {

  const [cache, setCache] = useState(null);

  return (
    <CacheProvider value={cache}>
      <div>
          <NavBar />

          <br></br>
          <div>
            <Routes>
              {/* Even though some links live exclusively in the NavBar
        component, all <Routes> are instantiated in the 
          App.jsx file to ensure high-level compatibility. */}
              <Route class="User Behavior Data" path="/" element={<Home />} />
              <Route class="Search Page" path="/search" element={<SearchResults />} />
              <Route class="Page Not Found" path="/*?" element={<PageNotFound />} />
            </Routes>
            <Footer />
          </div>
      </div>
    </CacheProvider>
  );
}

export default App;
