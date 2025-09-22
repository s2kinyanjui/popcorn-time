// pages/api/popular-movies.ts
import type { NextApiRequest, NextApiResponse } from "next"
import { fetchFromTMDB } from "../../../lib/tmdb"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await fetchFromTMDB("/movie/popular", {
      language: "en-US",
      page: 1,
    })

    // Transform movies response to fit UI needs
    const moviesTransformed = data.results.map((m: any) => ({
      background_url: m.backdrop_path
        ? `https://image.tmdb.org/t/p/original${m.backdrop_path}`
        : null,
      title: m.title,
      description: m.overview,
      rating: m.vote_average.toFixed(1),
      year: m.release_date ? new Date(m.release_date).getFullYear() : "N/A",
      quality: "HD",
    }))

    // Cache for 1 minute
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300")

    res.status(200).json(moviesTransformed)
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}
