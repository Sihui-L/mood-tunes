"use client";
import { Amplify } from "aws-amplify";
import awsExports from "../aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Login from "../components/Login";

Amplify.configure(awsExports);

interface HomeProps {
  signOut: () => void;
  user: {
    username: string;
  };
}

function Home({ signOut, user }: HomeProps) {
  return (
      <Login user={user} signOut={signOut} />
  );
}

export default withAuthenticator(Home);
