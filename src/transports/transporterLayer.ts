export type Provider =
  | "gemini"
  | "openai"
  | "claude"
  | "deepseek"
  | "ollama"
  | "webhook";

export async function sendToWebhook(
  url: string,
  payload: Record<string, any>,
): Promise<string> {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Webhook call failed: ${res.status} ${res.statusText}`);
  }

  const data = await res.json().catch(() => ({}));
  // data içinden output varsa onu döndür, yoksa raw string
  return data.output ?? JSON.stringify(data) ?? "No response";
}

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
  keyOrUrl: string,
  text: string,
  payload?: Record<string, any>,
): Promise<string> {
  switch (provider) {
    case "gemini":
      console.log("openai çalışıyor");
      return await sendToGemini(keyOrUrl, text);
    case "openai":
      console.log("openai çalışıyor");
      return await sendToOpenAI(keyOrUrl, text);
    case "webhook":
      // .env’den URL al
      const url = import.meta.env.VITE_BASE_URL_AI;
      if (!url) {
        throw new Error("VITE_BASE_URL_AI is not defined");
      }
      return await sendToWebhook(url, { text, ...payload });

    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
}
