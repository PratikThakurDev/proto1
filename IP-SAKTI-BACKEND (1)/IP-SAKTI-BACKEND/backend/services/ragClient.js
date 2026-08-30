import { env } from "../config/env.js";

async function callRag(path, body) {
  const response = await fetch(`${env.ragBaseUrl}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const text = await response.text();

  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }

  if (!response.ok) {
    const error = new Error(data?.detail || data?.message || `RAG service error: ${response.status}`);
    error.statusCode = 502;
    throw error;
  }

  return data;
}

export function ragSearch(body) {
  return callRag("/search", body);
}

export function ragAssess(body) {
  return callRag("/assess", body);
}

export function ragPassport(body) {
  return callRag("/passport", body);
}

export function ragChat(body) {
  return callRag("/chat", body);
}

export async function ragHealth() {
  const response = await fetch(`${env.ragBaseUrl}/health`);
  return response.json();
}
