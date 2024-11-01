import React from "react";
import SearchResults from "./components/SearchResults";

function App() {
  const tracks = [
    { id: 1, name: "Song 1", artist: "Artist 1", album: "Album 1" },
    { id: 2, name: "Song 2", artist: "Artist 2", album: "Album 2" },
    { id: 3, name: "Song 3", artist: "Artist 3", album: "Album 3" },
  ];
  return (
    <div className="App">
      {/* Pass down the tracks array as props to SearchResults */}
      <SearchResults tracks={tracks} />
    </div>
  );
}

export default App;
