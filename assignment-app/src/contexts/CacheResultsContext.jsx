import { createContext, useContext, useState } from 'react';

const CacheResultsContext = createContext(null);

export function CacheProvider({ children }) {
    const [cache, setCache] = useState(null);

    const setCachedResponse = (data) => {
        setCache(data);
    };

    return (
        <CacheResultsContext.Provider value={{ cache, setCachedResponse }}>
            {children}
        </CacheResultsContext.Provider>
    );
}

export const useCache = () => useContext(CacheResultsContext);