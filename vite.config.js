import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import crypto from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const GA4_PROPERTY_ID = '552488257';

function getAccessToken() {
  const serviceAccountPath = join(__dirname, 'asasjepun-analytics-652763bb32fa.json');
  let SERVICE_ACCOUNT;
  try {
    SERVICE_ACCOUNT = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
  } catch {
    throw new Error('GA4 service account file not found. Create asasjepun-analytics-652763bb32fa.json or remove the analytics plugin from vite.config.js.');
  }
  return new Promise((resolve, reject) => {
    const jwtHeader = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
    const now = Math.floor(Date.now() / 1000);
    const jwtClaim = Buffer.from(JSON.stringify({
      iss: SERVICE_ACCOUNT.client_email,
      scope: 'https://www.googleapis.com/auth/analytics.readonly',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600
    })).toString('base64url');
    const signingInput = `${jwtHeader}.${jwtClaim}`;
    const signer = crypto.createSign('RSA-SHA256');
    signer.update(signingInput);
    const signature = signer.sign(SERVICE_ACCOUNT.private_key, 'base64url');
    const jwt = `${signingInput}.${signature}`;

    const postData = new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth2:grant-type:jwt-bearer',
      assertion: jwt
    }).toString();

    const req = https.request({
      hostname: 'oauth2.googleapis.com',
      path: '/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const token = JSON.parse(data);
          resolve(token.access_token);
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function ga4Request(body) {
  const accessToken = await getAccessToken();
  const postData = JSON.stringify(body);
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'analyticsdata.googleapis.com',
      path: `/v1beta/properties/${GA4_PROPERTY_ID}:runReport`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(data));
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

export default defineConfig({
  build: {
    rollupOptions: {
      input: [resolve(__dirname, 'index.html')],
    },
  },
  plugins: [{
    name: 'ga4-analytics-proxy',
    configureServer(server) {
      server.middlewares.use('/api/analytics', async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');

        if (req.method === 'OPTIONS') {
          res.writeHead(204);
          res.end();
          return;
        }

        try {
          const url = new URL(req.url, 'http://localhost');
          const startDate = url.searchParams.get('startDate') || 'today';
          const endDate = url.searchParams.get('endDate') || 'today';
          const metric = url.searchParams.get('metric') || 'sessions';
          const dim = url.searchParams.get('dimension');

          const requestBody = {
            dateRanges: [{ startDate, endDate }],
            metrics: [{ name: metric }]
          };
          if (dim) requestBody.dimensions = [{ name: dim }];

          const data = await ga4Request(requestBody);
          res.writeHead(200);
          res.end(JSON.stringify(data));
        } catch (e) {
          res.writeHead(500);
          res.end(JSON.stringify({ error: e.message }));
        }
      });
    }
  }]
});
