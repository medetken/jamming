import React from "react";
<<<<<<< HEAD
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
=======

function SearchResults() {
  return <div className="SearchResults"></div>;
>>>>>>> f5707cd (added skeleton files and updated App.js)
}

export default SearchResults;
