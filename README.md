# 100 Days

A personal 100-day body transformation tracker, built as a PWA. Every day of the
challenge is a **hand-crafted page** — designed the evening before, one at a time,
each with its own personality. No generators. The full training/nutrition program
lives in [`program/PROGRAM.md`](program/PROGRAM.md); the nightly page-crafting
ritual is documented in [`CLAUDE.md`](CLAUDE.md).

## Stack

Vite · React 19 · TypeScript · Framer Motion · Firebase (Firestore + Google auth,
optional) · vite-plugin-pwa · Vercel

## Local dev

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # typecheck + production build
npm run preview   # serve the build
```

Requires Node ≥ 20.

Without Firebase configured the app runs in **localStorage-only mode** — fully
functional on a single device.

## Firebase setup (optional, enables cross-device sync)

1. [console.firebase.google.com](https://console.firebase.google.com) → Add project
   (no Analytics needed).
2. **Firestore Database** → Create database → production mode → region `asia-south1`.
3. **Authentication** → Sign-in method → enable **Google**.
4. **Project settings → Your apps → Add web app** → copy the config values into
   `.env.local` (see `.env.example`), and into Vercel → Project → Settings →
   Environment Variables.
5. **Authentication → Settings → Authorized domains** → add your Vercel domain.
6. **Firestore → Rules** → paste and publish:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

## Deploy (Vercel)

1. Push this repo to GitHub.
2. [vercel.com](https://vercel.com) → Add New Project → import the repo. Framework
   preset: **Vite** (auto-detected). No other config needed — `vercel.json` handles
   SPA routing.
3. Add the `VITE_FIREBASE_*` env vars if using Firebase, then deploy.
4. On your phone, open the deployed URL → browser menu → **Add to Home Screen**.

Every push to `main` deploys automatically — which is how each night's new day page
goes live by morning.
