import { performance } from 'node:perf_hooks';
import { randomUUID } from 'node:crypto';

const baseUrl = process.env.LOAD_TEST_BASE_URL?.replace(/\/$/, '');
const suppliedToken = process.env.LOAD_TEST_TOKEN;
const phone = process.env.LOAD_TEST_PHONE;
const password = process.env.LOAD_TEST_PASSWORD;
const targetType = process.env.LOAD_TEST_TARGET;
const vus = Number(process.env.LOAD_TEST_VUS ?? 5);
const rampSeconds = Number(process.env.LOAD_TEST_RAMP_SECONDS ?? 30);
const durationSeconds = Number(process.env.LOAD_TEST_DURATION_SECONDS ?? 60);
const thinkSeconds = Number(process.env.LOAD_TEST_THINK_SECONDS ?? 3);
const maxVus = 500;

if (!baseUrl || (!suppliedToken && (!phone || !password))) {
  console.error('Configure LOAD_TEST_BASE_URL et soit LOAD_TEST_TOKEN, soit LOAD_TEST_PHONE et LOAD_TEST_PASSWORD.');
  process.exit(2);
}
if (!['local', 'staging'].includes(targetType)) {
  console.error('LOAD_TEST_TARGET doit être « local » ou « staging ». Ce script refuse la production.');
  process.exit(2);
}
if (!Number.isInteger(vus) || vus < 1 || vus > maxVus || rampSeconds < 0 || durationSeconds < 1 || thinkSeconds < 0) {
  console.error(`Paramètres invalides. VUS doit être compris entre 1 et ${maxVus}; durée >= 1 seconde.`);
  process.exit(2);
}

const endpoints = [
  { name: 'profil', path: '/me' },
  { name: 'matières', path: '/me/subjects' },
  { name: 'chapitres', path: '/me/chapters' },
  { name: 'progression', path: '/me/progress' },
  { name: 'leçons', path: '/lessons' },
  { name: 'évaluations', path: '/assessments' },
  { name: 'planning', path: '/study-sessions' },
];
const stats = { requests: 0, successes: 0, failures: 0, statuses: new Map(), samples: new Map(), durations: [], bytes: 0 };
let accessToken = suppliedToken?.replace(/^Bearer\s+/i, '');
let refreshToken;
const startAt = Date.now();
const rampMs = rampSeconds * 1000;
const endAt = startAt + rampMs + durationSeconds * 1000;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function request(vu, endpoint) {
  const started = performance.now();
  let status = 'NETWORK_ERROR';
  let size = 0;
  try {
    const response = await fetch(`${baseUrl}${endpoint.path}`, {
      headers: { Authorization: authValue, Accept: 'application/json', 'X-Load-Test': `geduc-vu-${vu}` },
      signal: AbortSignal.timeout(15000),
    });
    status = String(response.status);
    size = Number(response.headers.get('content-length') ?? 0);
    await response.arrayBuffer();
    if (response.ok) stats.successes += 1;
    else stats.failures += 1;
  } catch {
    stats.failures += 1;
  }
  const elapsed = performance.now() - started;
  stats.requests += 1;
  stats.bytes += size;
  stats.statuses.set(status, (stats.statuses.get(status) ?? 0) + 1);
  stats.samples.set(endpoint.name, (stats.samples.get(endpoint.name) ?? 0) + 1);
  stats.durations.push(elapsed);
}

async function runUser(vu) {
  const offset = vus === 1 ? 0 : (rampMs * vu) / (vus - 1);
  await wait(offset);
  let sequence = vu;
  while (Date.now() < endAt) {
    await request(vu + 1, endpoints[sequence % endpoints.length]);
    sequence += 1;
    if (thinkSeconds) await wait(thinkSeconds * 1000);
  }
}

function percentile(sorted, percent) {
  if (!sorted.length) return 0;
  return sorted[Math.min(sorted.length - 1, Math.ceil((percent / 100) * sorted.length) - 1)];
}

console.log(`Cible: ${targetType} · ${baseUrl}`);
console.log(`Charge: ${vus} utilisateurs virtuels · rampe ${rampSeconds}s · palier ${durationSeconds}s · pause ${thinkSeconds}s`);
console.log('Parcours GET uniquement; aucun progrès, tentative ou contenu n’est modifié.');

if (!accessToken) {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ phone, password, deviceId: `load-test-${randomUUID()}`, deviceName: 'G-Educ Load Test' }),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) {
    console.error(`Connexion du compte de test refusée (HTTP ${response.status}). Vérifie les identifiants du compte élève de test.`);
    process.exit(2);
  }
  const session = await response.json();
  accessToken = session.accessToken;
  refreshToken = session.refreshToken;
  if (!accessToken) {
    console.error('La réponse de connexion ne contient pas de jeton d’accès.');
    process.exit(2);
  }
}

const authValue = `Bearer ${accessToken}`;
try {
  await Promise.all(Array.from({ length: vus }, (_, index) => runUser(index)));
} finally {
  if (refreshToken) {
    await fetch(`${baseUrl}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
      signal: AbortSignal.timeout(5000),
    }).catch(() => undefined);
  }
}

const sorted = stats.durations.sort((a, b) => a - b);
const actualSeconds = (Date.now() - startAt) / 1000;
console.log('\nRésultats');
console.log(`Requêtes: ${stats.requests} · réussies: ${stats.successes} · erreurs: ${stats.failures} · débit moyen: ${(stats.requests / actualSeconds).toFixed(2)} req/s`);
console.log(`Latences: p50=${percentile(sorted, 50).toFixed(0)}ms · p95=${percentile(sorted, 95).toFixed(0)}ms · p99=${percentile(sorted, 99).toFixed(0)}ms · max=${(sorted.at(-1) ?? 0).toFixed(0)}ms`);
console.log(`Codes HTTP: ${[...stats.statuses].map(([code, count]) => `${code}=${count}`).join(' · ') || 'aucun'}`);
console.log(`Volume JSON estimé (Content-Length): ${(stats.bytes / 1024 / 1024).toFixed(2)} Mo`);
console.log('Requêtes par parcours:', [...stats.samples].map(([name, count]) => `${name}=${count}`).join(' · '));
