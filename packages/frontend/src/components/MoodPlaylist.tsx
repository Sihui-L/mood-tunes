"use client";

import { useState } from "react";

export default function MoodPlaylist() {
  const [mood, setMood] = useState<string>("");
  const [playlist, setPlaylist] = useState([]);
  const [loading, setloading] = useState<boolean>(false);

  const getPlaylist = async (e: React.FormEvent) => {
    setloading(true);
    e.preventDefault();
    const res = await fetch("/api/mood", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mood }),
    });
    const data = await res.json();
    setPlaylist(data.playlist.split("\n"));
    setloading(false);
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">Generate Playlist by Mood</h2>
      <form onSubmit={getPlaylist}>
        <input
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="border p-2 text-black rounded"
          placeholder="Enter a mood (e.g. happy, sad)..."
        />
        <button type="submit" className="ml-2 bg-green-500 text-white px-4 py-2 rounded">
          {loading ? 'Generating' : 'Generate'}
        </button>
      </form>

      <div className="mt-4">
        {playlist.length > 0 && (
          <ul>
            {playlist.map((song, index) => (
              <li key={index} className="mt-2">🎵 {song}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
