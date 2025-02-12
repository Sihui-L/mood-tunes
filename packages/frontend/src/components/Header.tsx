"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";

export default function Header() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return (
    <div className="w-full py-4 bg-gray-800 bg-opacity-80 text-white flex items-center px-6">
      <h1 className="text-xl font-bold mx-auto">🎶 MoodTunes - AI Music Generator</h1>

      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm">Welcome, {user.username}!</span>
          <button
            onClick={signOut}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
