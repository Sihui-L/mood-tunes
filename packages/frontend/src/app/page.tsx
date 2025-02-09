"use client";

import { Amplify } from "aws-amplify";
import awsExports from "../aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Login from "../components/Login";
import SongSearch from "../components/SongSearch";
import MoodPlaylist from "../components/MoodPlaylist";

Amplify.configure(awsExports);

interface HomeProps {
  signOut: () => void;
  user: {
    username: string;
  };
}

function Home({ signOut, user }: HomeProps) {
  return (
    <>
      <Login user={user} signOut={signOut} />
      <div className="mt-6">
        <SongSearch />
        <MoodPlaylist />
      </div>
    </>
  );
}

const AuthenticatedHome = withAuthenticator(Home);
export default function Page() {
  return <AuthenticatedHome signOut={function (): void {
    throw new Error("Function not implemented.");
  } } user={{
    username: ""
  }} />;
}
