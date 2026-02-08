# ChatDrawer

A simple and customizable **Chatbox Drawer** component built with React + TypeScript.

## 🚀 Features

- Configurable position (`bottom`, `top`, `left`, `right`)
- Theme support (user/bot colors)
- Toggleable drawer with smooth transitions
- Message history with auto-scroll
- Built-in input area (textarea + send button)
- Message handling powered by `ChatContext`

## 🤖 AI provider configuration

`AppProvider` / `ChatProvider` receives `chatConfig` via props and sends messages through `sendMessageToProvider`.

Supported provider values:

- `gemini`
- `openai`
- `webhook`

### AppProvider usage

```tsx
import { AppProvider, ChatDrawer } from "chatbox-drawer";

export default function App() {
  return (
    <AppProvider
      chatConfig={{ provider: "openai", apiKey: "your_openai_api_key" }}
    >
      <ChatDrawer />
    </AppProvider>
  );
}
```

### Provider-specific config examples

```tsx
// Gemini
chatConfig={{ provider: "gemini", apiKey: "your_gemini_api_key" }}

// OpenAI
chatConfig={{ provider: "openai", apiKey: "your_openai_api_key" }}

// Webhook
chatConfig={{ provider: "webhook", url: "https://your-service.example.com/chat" }}
```

> For `webhook`, the package sends a POST request with `{ text, ...payload }`.

## 📦 Installation

```bash
# clone the repository
git clone <repo-url>

# move into the example project
cd example

# install dependencies
npm install

# start development server
npm run dev
```
