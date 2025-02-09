"use client";


interface LoginProps {
  user: {
    username: string;
  };
  signOut: () => void;
}

export default function Login({ user, signOut }: LoginProps) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.username}!</h1>
      <button onClick={signOut} className="bg-red-500 text-white px-4 py-2 rounded">Sign Out</button>
    </div>
  );
}
