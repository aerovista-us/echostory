#!/usr/bin/env node
/**
 * Register EchoStory in Umami (team AeroVista).
 * Usage (PowerShell):
 *   $env:UMAMI_USERNAME='...'; $env:UMAMI_PASSWORD='...'
 *   node scripts/umami-register-echostory.mjs
 *
 * Optional: --write-config  patches config.js umamiWebsiteId
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const BASE = 'https://stats.aerocoreos.com';
const TEAM_ID = '9659160b-db08-4530-b648-8896aaaca77f';
const WEBSITE_NAME = 'EchoStory';
const WEBSITE_DOMAIN = 'aerovista-us.github.io/echostory';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const writeConfig = process.argv.includes('--write-config');

const username = process.env.UMAMI_USERNAME || process.env.UMAMI_USER;
const password = process.env.UMAMI_PASSWORD || process.env.UMAMI_PASS;

if (!username || !password) {
  console.error('Set UMAMI_USERNAME and UMAMI_PASSWORD environment variables.');
  process.exit(1);
}

async function login() {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    throw new Error(`Login failed: ${res.status} ${await res.text()}`);
  }
  const data = await res.json();
  return data.token;
}

async function listWebsites(token) {
  const res = await fetch(`${BASE}/api/websites`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(`List websites failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

async function createWebsite(token) {
  const res = await fetch(`${BASE}/api/websites`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: WEBSITE_NAME,
      domain: WEBSITE_DOMAIN,
      teamId: TEAM_ID,
    }),
  });
  if (!res.ok) {
    throw new Error(`Create website failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

function patchConfig(websiteId) {
  const configPath = join(root, 'config.js');
  let text = readFileSync(configPath, 'utf8');
  const next = text.replace(
    /umamiWebsiteId:\s*'[^']*'/,
    `umamiWebsiteId: '${websiteId}'`
  );
  if (next === text) {
    throw new Error('Could not find umamiWebsiteId in config.js');
  }
  writeFileSync(configPath, next, 'utf8');
  console.log(`Updated ${configPath}`);
}

const token = await login();
const sites = await listWebsites(token);
const list = Array.isArray(sites) ? sites : sites.data || sites.websites || [];

const existing = list.find(
  (w) =>
    w.name === WEBSITE_NAME ||
    (w.domain && w.domain.includes('echostory')) ||
    w.teamId === TEAM_ID && w.name?.toLowerCase().includes('echo')
);

const website = existing || (await createWebsite(token));
const id = website.id;

console.log(JSON.stringify({ id, name: website.name, domain: website.domain, created: !existing }, null, 2));

if (writeConfig) {
  patchConfig(id);
}
