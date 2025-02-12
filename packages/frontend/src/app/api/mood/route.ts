import { fetchOpenAIPlaylist } from "../../../lib/fetchMoodPlaylist";

export async function POST(req: Request) {
  try {
    const { mood } = await req.json();
    if (!mood) {
      return new Response(JSON.stringify({ error: "Mood is required" }), {
        status: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }

    const playlist = await fetchOpenAIPlaylist(mood);
    return new Response(JSON.stringify({ playlist }), {
      status: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }
}
