# IP-SAKTI Sahayak Frontend

Standalone React + Vite frontend for the IP-SAKTI Sahayak Ayurvedic IP and regulatory workspace.

## Run locally

Requirements: Node.js 18+ and pnpm 8+.

```bash
pnpm install
pnpm run dev
```

Open the local URL shown by Vite, normally `http://localhost:5173`.

### Windows PowerShell

```powershell
cd path\to\ip-sakti-sahayak-frontend
pnpm install
pnpm run dev
```

### macOS / Linux

```bash
cd /path/to/ip-sakti-sahayak-frontend
pnpm install
pnpm run dev
```

The development server listens on port `5173` by default. To use another port:

```bash
PORT=4173 pnpm run dev
```

On Windows PowerShell:

```powershell
$env:PORT=4173; pnpm run dev
```

## Production build

```bash
pnpm run build
pnpm run serve
```

The app is written in JavaScript/JSX; no TypeScript compiler or TypeScript source files are required. It uses local flag SVGs and the botanical reference image from `public/`, so no external asset download is required.