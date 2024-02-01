import React, { useState } from "react";

// Search Field Component Used for Account Balance and NFT pages
const Search = ({ handleSearch, placeholder, name }) => {
    const [inputValue, setInputValue] = useState();
    const handleChange = (e) => {
        setInputValue(e.target.value);
    };
    return (
        <div className="input-group mb-3">
            <input type="text" className="form-control" name={name} onChange={handleChange} placeholder={placeholder} />
            <button className="btn btn-success" onClick={() => handleSearch(inputValue)}>Search</button>
        </div>
    );
};

export default Search;