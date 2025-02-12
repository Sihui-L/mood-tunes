"use client";

import { useState } from "react";
import Player from "./Player";
import { Song } from "../types/index";

export default function MoodPlaylist() {
  const [mood, setMood] = useState<string>("");
  const [playlist, setPlaylist] = useState<Song[]>([]);
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

    const songs: Song[] = [];
    for (const songName of data.playlist) {
      const searchRes = await fetch(
        `/api/spotify/search?q=${songName}`
      );
      const searchData = await searchRes.json();
      const track = searchData.tracks.items[0];
      if (track) songs.push(track);
    }

    setPlaylist(songs);
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
        <button
          type="submit"
          className="ml-2 bg-green-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      {playlist.length > 0 && playlist.map((track) => <Player key={track.id} song={track}/>)}
    </div>
  );
}
