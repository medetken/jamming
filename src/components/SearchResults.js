import React from "react";
import Track from "./Track";

function SearchResults({ tracks, onAdd }) {
  return (
    <div className="SearchResults">
      <h2>Search Results</h2>
      {tracks.map((track) => (
        <Track key={track.id} track={track} onAdd={onAdd} />
      ))}
    </div>
  );
}

export default SearchResults;
