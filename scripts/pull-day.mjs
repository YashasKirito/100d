#!/usr/bin/env node
/**
 * Pull a day's progress (and measurements) from Firestore for the evening ritual.
 *
 * Usage:   node scripts/pull-day.mjs [dayNumber]     (defaults to all days)
 * Needs:   a Firebase service-account key JSON at .secrets/firebase-admin.json
 *          (Firebase console → Project settings → Service accounts →
 *           Generate new private key). The .secrets dir is gitignored.
 *
 * Zero dependencies: signs a JWT with node:crypto, exchanges it for an access
 * token, and reads the Firestore REST API.
 */
import { createSign } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const KEY_PATH = process.env.FIREBASE_ADMIN_KEY ?? join(root, '.secrets', 'firebase-admin.json')

let key
try {
  key = JSON.parse(readFileSync(KEY_PATH, 'utf8'))
} catch {
  console.error(`No service-account key at ${KEY_PATH}
Firebase console → Project settings → Service accounts → Generate new private key,
then save the JSON there.`)
  process.exit(1)
}

const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url')

async function accessToken() {
  const now = Math.floor(Date.now() / 1000)
  const unsigned = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64({
    iss: key.client_email,
    scope: 'https://www.googleapis.com/auth/datastore',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  })}`
  const sign = createSign('RSA-SHA256')
  sign.update(unsigned)
  const jwt = `${unsigned}.${sign.sign(key.private_key).toString('base64url')}`
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  })
  if (!res.ok) throw new Error(`token exchange failed: ${await res.text()}`)
  return (await res.json()).access_token
}

const BASE = `https://firestore.googleapis.com/v1/projects/${key.project_id}/databases/(default)/documents`

// unwrap Firestore's typed value encoding into plain JS
function unwrap(v) {
  if ('mapValue' in v) return Object.fromEntries(Object.entries(v.mapValue.fields ?? {}).map(([k, x]) => [k, unwrap(x)]))
  if ('arrayValue' in v) return (v.arrayValue.values ?? []).map(unwrap)
  if ('integerValue' in v) return Number(v.integerValue)
  if ('doubleValue' in v) return v.doubleValue
  return Object.values(v)[0]
}
const docData = (doc) => Object.fromEntries(Object.entries(doc.fields ?? {}).map(([k, v]) => [k, unwrap(v)]))

async function get(path, token) {
  const res = await fetch(`${BASE}/${path}`, { headers: { authorization: `Bearer ${token}` } })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`${path}: ${res.status} ${await res.text()}`)
  return res.json()
}

const token = await accessToken()
const users = (await get('users', token))?.documents ?? []
if (!users.length) {
  console.log('No users found in Firestore yet — has the app synced while signed in?')
  process.exit(0)
}

const dayArg = process.argv[2]

for (const u of users) {
  const uid = u.name.split('/').pop()
  console.log(`\n=== user ${uid} ===`)
  console.log('profile:', JSON.stringify(docData(u)))

  const days = (await get(`users/${uid}/days`, token))?.documents ?? []
  const wanted = dayArg ? days.filter((d) => d.name.split('/').pop() === String(dayArg)) : days
  for (const d of wanted.sort((a, b) => Number(a.name.split('/').pop()) - Number(b.name.split('/').pop()))) {
    console.log(`\n--- day ${d.name.split('/').pop()} ---`)
    console.log(JSON.stringify(docData(d), null, 2))
  }

  const ms = (await get(`users/${uid}/measurements`, token))?.documents ?? []
  for (const m of ms.sort((a, b) => Number(a.name.split('/').pop()) - Number(b.name.split('/').pop()))) {
    console.log(`\n--- measurement day ${m.name.split('/').pop()} ---`)
    console.log(JSON.stringify(docData(m), null, 2))
  }
}
