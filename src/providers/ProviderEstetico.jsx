import { createContext, useState, useContext } from 'react';


export const EsteticoContext = createContext();
export const useEstetico = () => useContext(EsteticoContext);


export function ProviderEstetico({ children }) {
    const [AsideOpen, setAsideOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    return(
        <EsteticoContext.Provider value={{ AsideOpen, setAsideOpen, searchQuery, setSearchQuery }}>
            {children}
            
        </EsteticoContext.Provider>
    );
}


export default ProviderEstetico;