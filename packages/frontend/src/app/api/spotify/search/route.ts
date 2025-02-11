import { fetchSpotifyToken } from "../../../../lib/fetchSpotifyToken";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const query = url.searchParams.get("q");

  if (!query) {
    return new Response(JSON.stringify({ error: "No search query provided" }), { status: 400 });
  }

  const accessToken = await fetchSpotifyToken();

  const searchResponse = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  const searchResults = await searchResponse.json();
  return new Response(JSON.stringify(searchResults), { status: 200 });
}
