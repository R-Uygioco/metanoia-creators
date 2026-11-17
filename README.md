# Metanoia Creators

## Frontend

Install dependencies and configure the public Sanity project ID and dataset from the project root:

```powershell
Copy-Item .\.env.example .\.env
```

Set `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET` in `.env`, then run:

```powershell
npm install
npm run dev
```

The frontend uses the public dataset with Sanity's `published` perspective. Do not add a Sanity
write token or any other secret to a `VITE_` variable. Published content must be readable by the
public API; configure the Sanity dataset and allowed frontend origins accordingly.

## Sanity Studio

Copy the Studio environment example, set the project ID, and start the Studio:

```powershell
Copy-Item .\studio\.env.example .\studio\.env
Set-Location .\studio
npm install
npm run dev
```

The Studio includes schemas for About page content, films, client projects, awards and recognition,
team members, and services. Keep one About page content document for the editable About copy.
Invite editors through Sanity project access settings; site visitors do not need a Sanity account.
Build and deploy the Studio with `npm run build` and `npm run deploy` from the `studio` directory.

Film publication status defaults to Festival Showcase Only. A YouTube URL is returned to the
frontend only for Approved Trailer Available or Publicly Released films. Clear the stored URL when
changing a film back to showcase-only; an unlisted or private video is not exempt from festival
premiere rules. The player validates supported YouTube URL formats, shows the Sanity thumbnail
before activation, and loads a muted `youtube-nocookie.com` embed only after the visitor selects
play.

## Contact email

The Vercel function at `api/contact.js` requires `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and
`CONTACT_FROM_EMAIL` as server-side environment variables. Never expose these through `VITE_`
variables.

## Deployment and production handoff

The site is designed to deploy as a Vercel app and a separate Sanity Studio project. The frontend
reads a public Sanity dataset and never writes directly from the browser.

### 1) Connect the repo to GitHub and Vercel

```powershell
cd "C:\path\to\metanoia-creators"
git init
git add .
git commit -m "Initial commit"
```

Then create the repository on GitHub and push the branch. In Vercel:

1. Import the repository.
2. Set the framework preset to Vite.
3. Set the root directory to the project root (`metanoia-creators`).
4. Configure environment variables for the frontend and serverless API:
   - `VITE_CONTACT_EMAIL`
   - `VITE_FACEBOOK_URL`
   - `VITE_INSTAGRAM_URL`
   - `VITE_YOUTUBE_URL`
   - `VITE_SANITY_PROJECT_ID`
   - `VITE_SANITY_DATASET`
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM_EMAIL`
5. Deploy the production build.

Optional CLI flow:

```powershell
npm install
npm run build
npx vercel login
npx vercel --prod
```

### 2) Add the custom domain

In Vercel, add the custom domain and configure the DNS records as instructed. After the domain is
verified, update the site title and canonical metadata in the app if needed.

### 3) Deploy the Sanity Studio

From the `studio` directory:

```powershell
Copy-Item .\.env.example .\.env
# Edit studio/.env and set SANITY_STUDIO_PROJECT_ID and SANITY_STUDIO_DATASET
Set-Location .\studio
npm install
npm run build
npm run deploy
```

Important: set your Sanity project permissions so only invited editors have access. Visitors do not
need Studio login access. Add the deployed frontend origins to Sanity CORS so the public site can read
the published dataset:

- `http://localhost:5173`
- `https://your-vercel-preview-url.vercel.app`
- `https://your-production-domain.com`

### 4) Content workflow for editors

Use the deployed Sanity Studio to update the site without editing React code. The content types are:

- Films
- Client Projects
- Awards
- Team members
- Services
- About page content

Recommended workflow:

1. Log in to the Studio with editor access.
2. Create or update a film/project/award entry.
3. Set the correct publication status:
   - `Festival Showcase Only` (default)
   - `Approved Trailer Available`
   - `Publicly Released`
4. For films, clear `youtubeUrl` when moving a film back to `Festival Showcase Only`.
5. Publish only the final content that should be publicly visible.
6. Refresh the production site after publishing; the frontend reads the published dataset only.

### 5) Post-deploy verification checklist

Use this checklist after the first production deployment:

- Frontend loads at the Vercel domain.
- Homepage renders without console errors.
- Navigation links work on desktop and mobile.
- Works, Films, Recognition, About, and Contact pages render.
- Contact form sends email through the Vercel serverless endpoint.
- Sanity Studio opens and content can be edited.
- Public pages reflect published Sanity content only.
- Festival showcase films do not show the full film unless publication status allows it.
- Social links and contact email render only when configured.
- No secret keys are present in `VITE_` variables.

### 6) Keep in sync

Whenever you change content in Sanity, make sure the site reads from the correct dataset and that the
project ID matches the production Studio project. If you add a custom domain, update any CORS and
allowed origin settings in both Vercel and Sanity before final launch.
