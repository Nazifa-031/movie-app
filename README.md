# 🎬 Movie App

A React movie discovery app using the **TMDB API**, with search, filters, pagination, loading states, and debounced API requests.

## ✨ Features

* 🔎 Search movies
* 🎯 Filter by genre, rating, and release year
* 📄 Pagination
* ⏳ Loading & error states
* 🕐 500ms search debounce
* 🖼️ Poster fallback handling

## 🛠️ Tech Stack

**React · JavaScript · Vite · TMDB API · Font Awesome**

## 🔑 Setup

Create `.env` in the project root:

```env
VITE_TMDB_API_KEY=your_tmdb_access_token
```

Vite exposes frontend environment variables only when they start with `VITE_`.

## 🧠 API Architecture

```text
React
  ↓
Endpoint Function
  ↓
fetchMovies(endpoint)
  ↓
TMDB API
  ↓
JSON Response
  ↓
React State → UI
```

A single reusable `fetchMovies()` function handles API requests. Endpoint functions only build the required URL.

### Endpoints

```text
allMovies()       → /discover/movie
searchapi()       → /search/movie
getGenres()       → /genre/movie/list
discoverMovies()  → /discover/movie + filters
```

### Fetch Logic

```text
Filters active?
   ↓ Yes → discoverMovies()

No
 ↓
Search active?
   ↓ Yes → searchapi()

No
 ↓
allMovies()
```

Filters are built with `URLSearchParams`, allowing optional genre, rating, and year parameters.

## 📂 Structure

```text
src/
├── components/
│   ├── Filter.jsx
│   ├── Loader.jsx
│   ├── MovieCards.jsx
│   ├── Pagination.jsx
│   └── Search.jsx
├── services/
│   └── tmdb.js
└── pages/
    └── Main.jsx
```

## 📚 Key Concepts Practiced

**API fetching · async/await · React state · useEffect · debouncing · URLSearchParams · destructuring · pagination · conditional rendering**
