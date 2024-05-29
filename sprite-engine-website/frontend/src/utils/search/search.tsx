import React, { useState, useEffect } from 'react';
import "./search.css"

interface SearchProps {
    handleEnterPress: (event: KeyboardEvent) => void;
    search: (searchText: string) => void;
    searchFor: string;
    id:string;
}

const SearchComponent: React.FC<SearchProps> = (props) => {
    const [searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        props.search(searchText);
    }, [searchText]);

    useEffect(() => {

        document.addEventListener('keypress', props.handleEnterPress);
        
        return () => {
            document.removeEventListener('keypress', props.handleEnterPress);
        };
    }, []); 

    return (
        <div className="search-bar">
            <input  
                type="text"
                id={props.id}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder={props.searchFor}
            />
        </div>
    );
}

export default SearchComponent;