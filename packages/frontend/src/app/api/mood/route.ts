export async function POST(req: Request) {
  try {
    const { mood } = await req.json();
    const openaiApiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    if (!mood) {
      return new Response(JSON.stringify({ error: "Mood is required" }), {
        status: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Suggest 5 Spotify song names for the mood: ${mood}` }],
        max_tokens: 100,
      }),
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Failed to generate playlist" }), {
        status: 500,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify({ playlist: data.choices[0].message.content }), {
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
