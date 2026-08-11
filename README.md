# Zorestia

Marketing / business website for **Zorestia** — a consulting brand helping businesses grow, automate, and scale through AI, technology, sales, business development, and strategic solutions.

🔗 Live site: [zorestia.com](https://zorestia.com)

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build tool:** Vite
- **Styling:** Tailwind CSS 4
- **Animation:** Framer Motion
- **3D / Visuals:** Three.js via `@react-three/fiber` and `@react-three/drei`
- **Icons:** Lucide React
- **Backend / Database:** Supabase (`@supabase/supabase-js`), with SQL migrations in `supabase/migrations`

## Project Structure

```
Zorestia/
├── .bolt/                  # Bolt.new project metadata
├── public/                 # Static assets served as-is
├── src/                    # Application source (components, pages, styles)
├── supabase/
│   └── migrations/         # Database schema / migrations
├── index.html              # App entry HTML
├── package.json
├── vite.config.ts
├── tsconfig*.json
└── dist.zip                # Pre-built production bundle
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ and npm
- A [Supabase](https://supabase.com) project (URL + anon key) if you need working backend features (forms, data storage, etc.)

### Installation

```bash
git clone https://github.com/gulatirahul569/Zorestia.git
cd Zorestia
npm install
```

### Environment Variables

Create a `.env` file in the project root with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development

```bash
npm run dev
```

This starts the Vite dev server (default: `http://localhost:5173`).

### Build

```bash
npm run build
```

Compiles TypeScript and produces an optimized production build in `dist/`.

### Preview Production Build

```bash
npm run preview
```

## Database

Database schema changes live under `supabase/migrations`. Apply them to a linked Supabase project using the [Supabase CLI](https://supabase.com/docs/guides/cli):

```bash
supabase link --project-ref <your-project-ref>
supabase db push
```

## Deployment

The `dist/` folder (or the included `dist.zip`) contains the static production build and can be deployed to any static hosting provider (Vercel, Netlify, Cloudflare Pages, etc.). Set the same environment variables in your hosting provider's dashboard as used locally.

## License

Proprietary — all rights reserved. This code is delivered for the exclusive use of the client and may not be redistributed without permission.
