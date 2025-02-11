"use client";

import SongSearch from "../components/SongSearch";
import MoodPlaylist from "../components/MoodPlaylist";
import { Authenticator } from "@aws-amplify/ui-react";

export default function Page() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="mt-6">
          <SongSearch />
          <MoodPlaylist />
        </div>
      )}
    </Authenticator>
  );
}
