"use client";

import SongSearch from "../components/SongSearch";
import MoodPlaylist from "../components/MoodPlaylist";

export default function Page() {
  return (
    <div className="mt-6">
      <SongSearch />
      <MoodPlaylist />
    </div>
  );
}
