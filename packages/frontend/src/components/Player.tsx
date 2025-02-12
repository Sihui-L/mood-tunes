import { Song } from "../types/index";

export default function Player({ song }: { song: Song }) {
  return (
    <div className="mt-4">
      <div key={song.id}>
        <p className="font-bold mb-2">{`🎵 ${song.name} - ${song.artists.map((artist) => artist.name).join(", ")}`}</p>
        <iframe
          src={`https://open.spotify.com/embed/track/${song.id}`}
          width="600"
          height="160"
          allow="encrypted-media"
          onError={(e) => {
            console.error(`Failed to load track: ${song.id}`);
            (e.target as HTMLIFrameElement).style.display = "none";
          }}
        ></iframe>
      </div>
    </div>
  );
}
