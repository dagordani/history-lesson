# History Quest MCP

An embedded MCP App for learning history through context, choices, uncertainty, and connections—not passive recall.

## What works in this MVP

- A fullscreen embedded interface returned by `launch_history_quest`.
- Timeline, stakes, everyday analogy, prediction checkpoint, linked concepts, and choice-based counterfactuals.
- A detailed French Revolution quest and a generic inquiry scaffold for any other starting topic.
- In-widget tool calls that resolve a historical choice and award insight points.

## Run locally

```sh
npm install
npm run dev
```

The MCP endpoint is `http://localhost:8787/mcp`. Use a public HTTPS tunnel for ChatGPT development, then connect its HTTPS `/mcp` URL as a custom MCP server.

## Deploy

Deploy the directory as a Node 20+ service. Set the start command to `npm start`; the platform must expose `PORT`. The supplied Dockerfile is suitable for container hosts.

This initial version deliberately has no accounts, database, or secret. The next production increment is PostgreSQL plus user authentication for durable mastery profiles; a fact-reviewed content library or an OpenAI-backed authoring pipeline should replace the generic-topic scaffold before student-facing release.
