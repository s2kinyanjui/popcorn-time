# 🎬 PopcornTime

PopcornTime is a **Next.js movie recommendation application** that showcases the latest movies. It uses [The Movie Database (TMDB)](https://www.themoviedb.org/) API to fetch movie details and integrates **Mantine**, **TailwindCSS**, and **NextAuth** for UI, styling, and authentication.

Figma design file → [View on Figma](https://www.figma.com/design/OfSwOy5Iuok3qUyj0TpJFf/SIL-Assessment?node-id=0-1&t=Bo9d5w2MB8aUlWOD-1)

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/s2kinyanjui/popcorn-time.git
cd popcorn-time
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env.local` file in the root directory and add:

```bash
TMDB_API_KEY=your_tmdb_api_key
```

Generate a secure `AUTH_SECRET` with:

```bash
npx auth secret
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
The app auto-reloads on file changes.

---

## Available Scripts

- **`npm run dev`** → Start Next.js dev server (with Turbopack)
- **`npm run build`** → Create optimized production build
- **`npm run start`** → Run the production build
- **`npm run lint`** → Run ESLint checks
- **`npm run test`** → Run service and component tests with Vitest

---

## Testing

This project uses:

- [Vitest](https://vitest.dev/) as the testing framework
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for React component tests
- [jsdom](https://github.com/jsdom/jsdom) to simulate a browser environment

### Run all tests

```bash
npm run test
```

---

## Tech Stack

- **Next.js 15** (Pages Router)
- **React 19**
- **Mantine UI** (components)
- **TailwindCSS v4** (styling)
- **Framer Motion** (animations)
- **NextAuth** (authentication)
- **Vitest + Testing Library** (tests)
