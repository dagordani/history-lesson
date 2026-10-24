import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { registerAppResource, registerAppTool, RESOURCE_MIME_TYPE } from "@modelcontextprotocol/ext-apps/server";
import { z } from "zod";
import { questFor } from "./content.js";

const here = dirname(fileURLToPath(import.meta.url));
const widget = readFileSync(join(here, "../public/history-quest.html"), "utf8");
const UI_URI = "ui://history-quest/mission-v1.html";

function appServer() {
  const server = new McpServer({ name: "history-quest", version: "0.1.0" });
  registerAppResource(server, "history-quest-mission", UI_URI, {}, async () => ({
    contents: [{ uri: UI_URI, mimeType: RESOURCE_MIME_TYPE, text: widget }]
  }));

  const launchSchema = { topic: z.string().min(2).describe("A historical event, person, movement, or idea to explore") };
  const choiceSchema = { topic: z.string().min(2), choiceId: z.string().min(1) };
  const metadata = { ui: { resourceUri: UI_URI }, "openai/ui": { prefersDisplayMode: "fullscreen" } };
  registerAppTool(server, "launch_history_quest", {
    title: "Launch History Quest", description: "Creates an interactive historical decision mission with a timeline, stakes, and connected topics.",
    inputSchema: launchSchema, _meta: metadata
  }, async ({ topic }) => ({ content: [{ type: "text", text: `History Quest started: ${topic}` }], structuredContent: { quest: questFor(topic) } }));
  registerAppTool(server, "resolve_history_choice", {
    title: "Resolve a historical decision", description: "Explains the contemporary stakes and likely consequences of a choice in a History Quest.",
    inputSchema: choiceSchema, _meta: metadata
  }, async ({ topic, choiceId }) => {
    const quest = questFor(topic); const choice = quest.choices.find((item) => item.id === choiceId);
    return { content: [{ type: "text", text: choice ? choice.outcome : "That option is unavailable." }], structuredContent: { quest, selectedChoice: choice ?? null } };
  });
  return server;
}

const port = Number(process.env.PORT ?? 8787);
createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);
  if (req.method === "GET" && url.pathname === "/") return void res.writeHead(200, { "content-type": "application/json" }).end(JSON.stringify({ status: "ok", service: "history-quest" }));
  if (req.method === "OPTIONS" && url.pathname === "/mcp") return void res.writeHead(204, { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, GET, OPTIONS", "Access-Control-Allow-Headers": "content-type, mcp-session-id", "Access-Control-Expose-Headers": "Mcp-Session-Id" }).end();
  if (url.pathname !== "/mcp" || !req.method || !new Set(["POST", "GET", "DELETE"]).has(req.method)) return void res.writeHead(404).end("Not Found");
  res.setHeader("Access-Control-Allow-Origin", "*"); res.setHeader("Access-Control-Expose-Headers", "Mcp-Session-Id");
  const server = appServer();
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
  res.on("close", () => { void transport.close(); void server.close(); });
  try { await server.connect(transport); await transport.handleRequest(req, res); }
  catch (error) { console.error(error); if (!res.headersSent) res.writeHead(500).end("Internal server error"); }
}).listen(port, "0.0.0.0", () => console.log(`History Quest MCP listening at http://localhost:${port}/mcp`));
