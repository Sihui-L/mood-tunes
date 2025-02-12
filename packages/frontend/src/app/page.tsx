"use client";

import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import SongSearch from "../components/SongSearch";
import MoodPlaylist from "../components/MoodPlaylist";

export default function Page() {
  const { user } = useAuthenticator((context) => [context.user]);

  return (
    <>
      {user ? (
        <>
          <div className="mt-6">
            <SongSearch />
            <MoodPlaylist />
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Authenticator />
        </div>
      )}
    </>
  );
}
