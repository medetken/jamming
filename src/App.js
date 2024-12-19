import React, { useState } from "react";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";

function App() {
  ///saving playlist
  const savePlaylist = () => {
    ///step 1:Extract uris from Playlisttracks array
    const trackUris = playlistTracks.map((track) => track.uri);

    ///step 2:Simulate saving to Spotify
    console.log("Saving playlist with these URIs:", trackUris);

    //step 3:Reset the playlist name and tracks

    setPlaylistName("New Playlist");
    setPlaylistTracks([]);
  };
  //State for playlist name and tracks
  const [playlistName, setPlaylistName] = useState("New Playlist");

  const [playlistTracks, setPlaylistTracks] = useState([
    {
      id: 1,
      name: "Song 1",
      artist: "Artist 1",
      album: "Album 1",
      uri: "spotify:track:1",
    },
    {
      id: 2,
      name: "Song 2",
      artist: "Artist 2",
      album: "Album 2",
      uri: "spotify:track:2",
    },
    {
      id: 3,
      name: "Song 3",
      artist: "Artist 3",
      album: "Album 3",
      uri: "spotify:track:3",
    },
  ]);

  const [searchResults, setSearchResults] = useState([
    { id: 1, name: "Song 1", artist: "Artist 1", album: "Album 1" },
    { id: 2, name: "Song 2", artist: "Artist 2", album: "Album 2" },
    { id: 3, name: "Song 3", artist: "Artist 3", album: "Album 3" },
  ]);

  ///Add track to playlist
  const addTrack = (track) => {
    ///check if already in the playlist
    if (playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
      return; ///if track exists, do nothing
    }
    ///add track to playlist
    setPlaylistTracks((prevTracks) => [...prevTracks, track]);
  };

  ///remove track from playlist
  const removeTrack = (track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((savedTrack) => savedTrack.id !== track.id)
    );
  };

  ///function to update the playlist name
  const handleNameChange = (name) => {
    setPlaylistName(name);
  };

  // const tracks = [
  //   { id: 1, name: "Song 1", artist: "Artist 1", album: "Album 1" },
  //   { id: 2, name: "Song 2", artist: "Artist 2", album: "Album 2" },
  //   { id: 3, name: "Song 3", artist: "Artist 3", album: "Album 3" },
  // ];
  return (
    <div className="App">
      {/* Pass down the tracks array as props to SearchResults */}

      <Playlist
        playlistName={playlistName}
        playlistTracks={playlistTracks}
        onNameChange={handleNameChange}
        onRemove={removeTrack}
        onSave={savePlaylist}
      />

      <SearchResults tracks={searchResults} onAdd={addTrack} />
    </div>
  );
}

export default App;
