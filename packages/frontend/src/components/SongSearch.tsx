"use client";

import { useState } from "react";

interface track {
  id: string;
  name: string;
  artists: { name: string }[];
}

export default function SongSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchSongs = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/spotify/search?q=${query}`);
    const data = await res.json();
    setResults(data.tracks.items || []);
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">Search Songs</h2>
      <form onSubmit={searchSongs}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 text-black rounded"
          placeholder="Search for a song..."
        />
        <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      <div className="mt-4">
        {results.length > 0 && (
          <ul>
            {results.map((track: track) => (
              <li key={track.id} className="mt-2">
                🎵 {track.name} - {track.artists.map((artist) => artist.name).join(', ')}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
