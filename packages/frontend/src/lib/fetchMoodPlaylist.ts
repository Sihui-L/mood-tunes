export async function fetchOpenAIPlaylist(mood: string) {
  const openaiApiKey = process.env.OPENAI_API_KEY;

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
    throw new Error("Failed to generate playlist");
  }

  const data = await response.json();

  return data.choices[0].message.content.split("\n").map((song: string) => song.replace(/^\d+\.\s*/, "").replace(/"/g, ""));
}
