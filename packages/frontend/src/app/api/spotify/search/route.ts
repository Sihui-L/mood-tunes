export async function GET(req: Request) {
  const url = new URL(req.url);
  const query = url.searchParams.get("q");

  if (!query) {
    return new Response(JSON.stringify({ error: "No search query provided" }), { status: 400 });
  }

  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  // Get Access Token
  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${credentials}`,
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
  });

  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;

  // Search for a song
  const searchResponse = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  const searchResults = await searchResponse.json();
  return new Response(JSON.stringify(searchResults), { status: 200 });
}
