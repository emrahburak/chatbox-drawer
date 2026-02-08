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

`ChatContext` reads provider settings from environment variables and sends messages through `sendMessageToProvider`.

Supported `VITE_PROVIDER` values:

- `gemini`
- `openai`
- `webhook`

### Example: Gemini

```env
VITE_PROVIDER=gemini
VITE_AI_API_KEY=your_gemini_api_key
```

### Example: OpenAI

```env
VITE_PROVIDER=openai
VITE_AI_API_KEY=your_openai_api_key
```

### Example: Webhook

```env
VITE_PROVIDER=webhook
VITE_BASE_URL_AI=https://your-service.example.com/chat
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
