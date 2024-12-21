const clientId = "a30aca3e987c4a6ab9d5a4afc4abe055"; /// replace with your spotify client id
const redirectUri = "http://localhost:3000/"; ///replace with your redirect URI

let accessToken;

const Spotify = {
  getAccessToken() {
    //Step 1: Check if token already exists;
    console.log("Access Token:", accessToken);
    if (accessToken) {
      return accessToken;
    }

    ///Step 2: Check if token is in the URL
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      /// Step 3: extract token and expiration time
      accessToken = accessTokenMatch[1];

      const expiresIn = Number(expiresInMatch[1]);

      //step 4:Clear token from URl to avoid issues

      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      ///Step5: Redirect to Spotify for authentication
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public playlist-modify-private&redirect_uri=${redirectUri}`;
      window.location = authUrl;
    }
  },

  search(term) {
    const accessToken = this.getAccessToken();

    //step 1: Make a GET request to Spotify API
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch new tracks from Spotify");
        }
        return response.json(); ///convert resonse to JSON
      })
      .then((jsonResponse) => {
        ///Step 2: convert response to track objects
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name, ///Use the firts artist
          album: track.album.name,
          uri: track.uri,
        }));
      })
      .catch((error) => {
        console.error("Spotify search error:", error);
      });
  },

  savePlaylist(PlaylistName, trackUris) {
    if (!PlaylistName || !trackUris.length) {
      console.error("playlistname or tracks are missing");
      return; ///Don't proceed if the playlist name or tracks are missing
    }

    const accessToken = this.getAccessToken();
    if (!accessToken) {
      console.error("Access token is missing. Cannot save playlist.");
      return Promise.reject("Access token is missing.");
    }
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    let userId;

    ///Step 1: get user's spotify id

    return fetch("https://api.spotify.com/v1/me", { headers })
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to fetch user ID");
        }
        return response.json();
      })
      .then((jsonResponse) => {
        userId = jsonResponse.id;
        console.log("User ID:", userId);
        ///Step 2: Create a new playlist
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            name: PlaylistName,
            description: "Created with Jamming",
            public: false, ///make the playlist private
          }),
        });
      })
      .then((response) => {
        console.log("Create Playlist Response Status:", response.status);
        console.log("Create Playlist Response Body:", response);
        if (!response.ok) {
          throw new Error("Failed to create playlist");
        }
        return response.json();
      })
      .then((jsonResponse) => {
        const playlistId = jsonResponse.id;
        console.log("Playlist Created:", jsonResponse);

        ///Step 3: Add tracks to the playlist

        return fetch(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
              uris: trackUris,
            }),
          }
        );
      })
      .then((response) => {
        console.log("Add Tracks Response Status:", response.status);
        if (!response.ok) {
          throw new Error("failed to add tracks to playlist");
        }
        return response.json();
      })
      .then((jsonResponse) => {
        console.log("tracks added succesfully", jsonResponse);
      })
      .catch((error) => {
        console.error("Spotify save playlist error", error);
      });
  },
};

export default Spotify;
