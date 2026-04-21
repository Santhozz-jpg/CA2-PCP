# CA2 Fitness Tracker Activities

This project is implemented as per the provided CA2 text files using:

- React Context as single source of truth
- useReducer for all updates
- React Router for required routes
- map/filter/reduce for render and analytics
- Dynamic stats and global exposure in `/stats`

## Mandatory Routes

- `/activities`
- `/activities/:id`
- `/filter`
- `/stats`

## Test IDs Implemented

- `data-testid="total-activities"`
- `data-testid="goal-achieved"`
- `data-testid="goal-not-achieved"`
- `data-testid="activity-item"`

## Global State Exposure on `/stats`

The `/stats` page sets:

- `window.appState`
- `window.appstate`

Both are updated dynamically from computed values.

## API Setup

Create a `.env` file in project root from `.env.example` and set:

```env
VITE_API_BASE_URL=https://your-api-base-url
VITE_STUDENT_ID=YOUR_REGISTER_NUMBER
VITE_STUDENT_PASSWORD=YOUR_PASSWORD
```

The app fetches:

1. `POST /public/token`
2. `GET /private/data` with `Authorization: Bearer <token>`

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Push

```bash
git init
git add .
git commit -m "CA2 fitness tracker activities app"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## Vercel Deploy

1. Push code to GitHub.
2. Go to Vercel dashboard.
3. Import the GitHub repository.
4. In Project Settings -> Environment Variables add:
	- `VITE_API_BASE_URL`
	- `VITE_STUDENT_ID`
	- `VITE_STUDENT_PASSWORD`
5. Deploy.

After deploy, verify these routes in the live URL:

- `/activities`
- `/activities/:id`
- `/filter`
- `/stats`
