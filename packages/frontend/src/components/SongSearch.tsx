"use client";

import { useState } from "react";
import Player from "./Player";
import { Song } from "../types/index";

export default function SongSearch() {
  const [query, setQuery] = useState<string>("");
  const [tracks, setTracks] = useState<Song[]>([]);
  const [loading, setloading] = useState<boolean>(false);

  const searchSongs = async (e: React.FormEvent) => {
    setloading(true);
    e.preventDefault();
    const res = await fetch(`/api/spotify/search?q=${query}`);
    const data = await res.json();
    setTracks(data.tracks.items || []);
    setloading(false);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Search Songs</h2>
      <form onSubmit={searchSongs}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 mb-4 text-black rounded"
          placeholder="Search for a song..."
        />
        <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {tracks.length > 0 && tracks.map((track) => <Player key={track.id} song={track}/>)}
    </div>
  );
}

// TODO1: Add playlist management functionality
// TODO2: Make mood playlist results random
// TODO3: Add template mood playlists
// TODO4: Make UI better