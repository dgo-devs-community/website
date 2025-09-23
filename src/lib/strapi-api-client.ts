import { strapi } from '@strapi/client';

const headers: Record<string, string> = {
  'Content-Type': 'application/json',
};

if (process.env.STRAPI_API_TOKEN) {
  headers['Authorization'] = `Bearer ${process.env.STRAPI_API_TOKEN}`;
}

const baseURL = `${process.env.PUBLIC_STRAPI_API_URL}/api`;

const client = strapi({
  baseURL,
  headers,
});

export default client;