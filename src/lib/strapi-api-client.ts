import { strapi } from "@strapi/client";
import { env } from "@/env";
const headers: Record<string, string> = {
  "Content-Type": "application/json",
};

if (env.STRAPI_API_TOKEN) {
  headers["Authorization"] = `Bearer ${env.STRAPI_API_TOKEN}`;
}

const baseURL = `${env.STRAPI_API_URL}/api`;

const client = strapi({
  baseURL,
  headers,
});

export default client;
