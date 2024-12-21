import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm) {
      onSearch(searchTerm);
    }
  };
  return (
    <div className="SearchBar">
      <input
        type="text"
        placeholder="Enter a song, album or artist"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} //Update state on input
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
