# Screener

_A sleek media discovery app — making movie and series exploration effortless and enjoyable_

> _Built for binge-watchers and cinephiles who want a modern, fast, and intuitive experience._

## Overview

**Screener** is a responsive and modern web application that allows users to effortlessly browse, search, and explore information about their favorite **movies** and **TV series**. It offers a beautiful and smooth user interface built using **TypeScript**, **React**, **Next.js**, **Mantine**, and **React Query**.

It solves the common problem of cluttered and slow entertainment platforms by offering:

- Clean UI/UX
- Instant search
- Rich detail pages with IMDb data
- Personalized recommendations

Whether you're looking for your next weekend binge or want to check ratings, Screener makes discovery simple and fun.

## Why This Project?

Most movie/series databases feel outdated or overwhelming, especially for casual viewers. **Screener** was inspired by the need for a:

- Clean and intuitive movie browsing experience
- Fast and responsive UI without annoying delays
- Visually driven design with posters, ratings, and release data front and center

Design decisions focused on:

- Real-time interactivity using React Query
- Scalable and readable codebase via TypeScript
- Minimalist, modern components using Mantine

## Features

- Explore a wide collection of Movies and TV Series
- Real-time search with no page reloads
- Detailed pages with IMDb ratings, release info, and posters
- Personalized recommendations based on user behavior
- Fully responsive design for all devices
- Fast, smooth user experience with React Query

## Roadmap

- [x] Phase 1: MVP with search, browsing, and detailed pages
- [ ] Phase 2: Add watchlists and user profiles
- [ ] Phase 3: Integrate streaming APIs or trailers
- [ ] Phase 4: Enable multi-language support and localization

## Tech Stack

**Frontend:**
Next.js · React.js · TypeScript · Mantine · React Query

**Backend (Planned):**
Node.js · Express.js · MongoDB (or Supabase)

**Dev Tools:**
Vercel · Git · VS Code

## Getting Started

### Prerequisites

- Node.js & npm
- Git

### Installation

```bash
git clone https://github.com/yourusername/screener.git
cd screener
npm install
npm run dev
```

## Environment Variables

Create a `.env` file and configure:

```env
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
```

_(Uses TMDB or similar for content data.)_

## Usage

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to access the app.

## Architecture

```
[Frontend (Next.js + Mantine)]
       ↓
[API (TMDB or other media database)]
       ↓
[Optional: Custom backend for personalization, auth, etc.]
```

## Deployment

**Cloud:** Deployed on Vercel
**Media API:** Powered by TMDB (The Movie Database)
**Future Hosting Options:** AWS / Render / GCP

## Contributing

We welcome contributions! To contribute:

1. Fork this repo
2. Create your branch: `git checkout -b feature/feature-name`
3. Commit your changes
4. Push to your branch: `git push origin feature/feature-name`
5. Open a pull request

## License

This project is licensed under the [MIT License](LICENSE).

## Credits

- Inspired by platforms like **IMDb** and **TMDB**
- Built by John Rommel Octaviano
- Powered by **TypeScript**, **React**, **Next.js**, and **Mantine**
