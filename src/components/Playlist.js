import React from "react";
import Tracklist from "./Tracklist";

function Playlist({
  playlistName,
  playlistTracks,
  onNameChange,
  onRemove,
  onSave,
}) {
  //function to handle input changes for the playlist name
  const handleTitleChange = (event) => {
    onNameChange(event.target.value);
  };
  return (
    <div className="Playlist">
      {/*input for playlist name*/}
      <input
        value={playlistName}
        onChange={handleTitleChange}
        placeholder="Enter playlist name"
      />
      {/* Display tracklist */}
      <Tracklist tracks={playlistTracks} onRemove={onRemove} />

      <button onClick={onSave}> Save to Spotify</button>
    </div>
  );
}

export default Playlist;
