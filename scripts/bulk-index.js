#!/usr/bin/env node
/**
 * Bulk URL Indexing Tool — iptvtotaal.digital
 *
 * Submits all site URLs to:
 *   1. IndexNow  → Bing, Yandex, IndexNow.org (instant, no auth needed)
 *   2. Google    → Indexing API (requires service account credentials)
 *
 * Usage:
 *   node scripts/bulk-index.js              → IndexNow only
 *   node scripts/bulk-index.js --google     → IndexNow + Google
 *
 * Google setup (one-time):
 *   1. Go to https://console.cloud.google.com
 *   2. Create a project → Enable "Web Search Indexing API"
 *   3. Create a Service Account → download JSON key
 *   4. Save the JSON key as: scripts/google-credentials.json
 *   5. In Google Search Console → Settings → Users and permissions
 *      → Add the service account email as "Owner"
 */

import { readFileSync, existsSync } from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// ── Config ────────────────────────────────────────────────────────────────────
const SITE = 'https://www.iptvtotaal.digital';
const INDEXNOW_KEY = '625a9bdce8cfb01d327e2dbe51b54dd3';
const GOOGLE_CREDENTIALS = './scripts/google-credentials.json';

// ── All URLs to index ─────────────────────────────────────────────────────────
const URLS = [
  // Core pages
  `${SITE}/`,
  `${SITE}/kanalen`,
  `${SITE}/reseller`,
  `${SITE}/over-ons`,
  `${SITE}/algemene-voorwaarden`,
  `${SITE}/privacybeleid`,
  `${SITE}/blog`,

  // Service pages
  `${SITE}/wereldkampioenschap-voetbal-2026`,
  `${SITE}/nederland-oezbekistan-live`,
  `${SITE}/eredivisie-live-kijken`,

  // WK 2026 live kijken — overview + 7 match pages
  `${SITE}/wk-2026-live-kijken`,
  `${SITE}/wk-2026-live-kijken/nederland-vs-japan-live-kijken-wk-2026`,
  `${SITE}/wk-2026-live-kijken/nederland-vs-zweden-live-kijken-wk-2026`,
  `${SITE}/wk-2026-live-kijken/tunesie-vs-nederland-live-kijken-wk-2026`,
  `${SITE}/wk-2026-live-kijken/mexico-vs-zuidafrika-live-kijken-wk-2026`,
  `${SITE}/wk-2026-live-kijken/usa-vs-paraguay-live-kijken-wk-2026`,
  `${SITE}/wk-2026-live-kijken/brazilie-vs-marokko-live-kijken-wk-2026`,
  `${SITE}/wk-2026-live-kijken/saudi-arabie-vs-uruguay-live-kijken-wk-2026`,

  // WK 2026 blog posts
  `${SITE}/blog/nederland-japan-wk-2026`,
  `${SITE}/blog/nederland-zweden-wk-2026`,
  `${SITE}/blog/tunesie-nederland-wk-2026`,
  `${SITE}/blog/mexico-zuid-afrika-wk-2026`,
  `${SITE}/blog/usa-paraguay-wk-2026`,
  `${SITE}/blog/brazilie-marokko-wk-2026`,
  `${SITE}/blog/saudi-arabie-uruguay-wk-2026`,

  // Other blog posts
  `${SITE}/blog/internet-protocol-tv-providers`,
  `${SITE}/blog/wat-is-iptv`,
  `${SITE}/blog/ss-iptv`,
  `${SITE}/blog/hoe-werkt-iptv`,
  `${SITE}/blog/eredivisie-kijken`,
  `${SITE}/blog/stand-wk-2026`,
  `${SITE}/blog/iptv-dark`,
  `${SITE}/blog/kpn-iptv`,
  `${SITE}/blog/iptv-kopen`,
  `${SITE}/blog/nederland-uzbekistan-2026`,
  `${SITE}/blog/iptvtotaal-app`,
  `${SITE}/blog/iptv-installeren-smart-tv`,
  `${SITE}/blog/iptv-vs-netflix`,
  `${SITE}/blog/beste-iptv-nederland-2025`,
  `${SITE}/blog/iptv-live-sport-kijken`,
  `${SITE}/blog/iptv-4k-kwaliteit`,
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const green  = (s) => `\x1b[32m${s}\x1b[0m`;
const red    = (s) => `\x1b[31m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const bold   = (s) => `\x1b[1m${s}\x1b[0m`;

// ── IndexNow ──────────────────────────────────────────────────────────────────
async function submitIndexNow() {
  console.log(bold('\n── IndexNow (Bing · Yandex · IndexNow.org) ──────────────'));
  console.log(`  Submitting ${URLS.length} URLs...`);

  const endpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
    'https://yandex.com/indexnow',
  ];

  const body = JSON.stringify({
    host: new URL(SITE).host,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`,
    urlList: URLS,
  });

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body,
      });
      const engine = new URL(endpoint).host;
      if (res.ok || res.status === 202) {
        console.log(`  ${green('✓')} ${engine} → ${res.status} ${res.statusText}`);
      } else {
        const text = await res.text().catch(() => '');
        console.log(`  ${red('✗')} ${engine} → ${res.status} ${res.statusText} ${text ? `(${text.slice(0,80)})` : ''}`);
      }
    } catch (err) {
      console.log(`  ${red('✗')} ${new URL(endpoint).host} → ${err.message}`);
    }
  }
}

// ── Google Indexing API ───────────────────────────────────────────────────────
async function submitGoogle() {
  console.log(bold('\n── Google Indexing API ──────────────────────────────────'));

  if (!existsSync(GOOGLE_CREDENTIALS)) {
    console.log(`  ${yellow('⚠')}  Credentials not found at: ${GOOGLE_CREDENTIALS}`);
    console.log(`  ${yellow('→')}  See setup instructions at the top of this script.`);
    return;
  }

  let client;
  try {
    const { GoogleAuth } = require('google-auth-library');

    const auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/indexing'],
      ...(existsSync(GOOGLE_CREDENTIALS) ? { keyFile: GOOGLE_CREDENTIALS } : {}),
    });
    client = await auth.getClient();

    const method = existsSync(GOOGLE_CREDENTIALS) ? 'credentials file' : 'application default credentials';
    console.log(`  ${green('✓')} Authenticated via ${method}`);
  } catch (err) {
    console.log(`  ${red('✗')} Auth failed: ${err.message}`);
    console.log(`  ${yellow('→')} Run: gcloud auth application-default login`);
    return;
  }

  const GOOGLE_API = 'https://indexing.googleapis.com/v3/urlNotifications:publish';
  let ok = 0, fail = 0;

  for (const url of URLS) {
    try {
      const tokenRes = await client.getAccessToken();
      const token = tokenRes.token;

      const res = await fetch(GOOGLE_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ url, type: 'URL_UPDATED' }),
      });

      if (res.ok) {
        ok++;
        process.stdout.write(`  ${green('✓')} ${url.replace(SITE, '')}\n`);
      } else {
        fail++;
        const data = await res.json().catch(() => ({}));
        const msg = data?.error?.message ?? res.statusText;
        process.stdout.write(`  ${red('✗')} ${url.replace(SITE, '')} → ${msg}\n`);
      }

      // Rate limit: Google allows 200 req/day, pace at 10/sec
      await new Promise(r => setTimeout(r, 100));
    } catch (err) {
      fail++;
      process.stdout.write(`  ${red('✗')} ${url.replace(SITE, '')} → ${err.message}\n`);
    }
  }

  console.log(`\n  Google result: ${green(ok + ' submitted')} ${fail ? red(fail + ' failed') : ''}`);
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const useGoogle = process.argv.includes('--google');

  console.log(bold(`\nBulk Index Tool — ${SITE}`));
  console.log(`Total URLs: ${URLS.length}`);

  await submitIndexNow();

  if (useGoogle) {
    await submitGoogle();
  } else {
    console.log(`\n${yellow('ℹ')}  Google skipped. Run with ${bold('--google')} flag to include Google Indexing API.`);
  }

  console.log(bold('\n✓ Done\n'));
}

main().catch(err => {
  console.error(red('\nFatal error: ' + err.message));
  process.exit(1);
});
