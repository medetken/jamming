import React from "react";
import Track from "./Track";

function SearchResults({ tracks }) {
  return (
    <div className="SearchResults">
      <h2>Search Results</h2>
      {/* Map over tracks and render a Track component for each item */}
      {tracks.map((track) => (
        <Track key={track.id} track={track} />
      ))}
    </div>
  );
}

export default SearchResults;
