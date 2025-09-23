export type Provider = "gemini" | "openai" | "claude" | "deepseek" | "ollama";

export async function sendToGemini(
  apiKey: string,
  text: string,
): Promise<string> {
  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text }] }],
      }),
    },
  );
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response";
}

export async function sendToOpenAI(
  apiKey: string,
  text: string,
): Promise<string> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: text }],
    }),
  });
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "No response";
}

export async function sendMessageToProvider(
  provider: Provider,
  apiKey: string,
  text: string,
): Promise<string> {
  switch (provider) {
    case "gemini":
      return sendToGemini(apiKey, text);
    case "openai":
      return sendToOpenAI(apiKey, text);
    // ileride claude, deepseek, ollama eklenir
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
}
