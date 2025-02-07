export async function GET(req: Request) {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

  const token = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`
    },
    body: "grant_type=client_credentials",
  }).then(res => res.json());

  return new Response(JSON.stringify(token), { status: 200 });
}

export async function POST(req: Request) {
  const { mood } = await req.json();
  const openaiApiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiApiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Give me a Spotify playlist idea for the mood: ${mood}` }],
    }),
  });

  const data = await response.json();
  return new Response(JSON.stringify(data.choices[0].message.content), { status: 200 });
}
