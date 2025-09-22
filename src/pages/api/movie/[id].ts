import type { NextApiRequest, NextApiResponse } from "next"
import { fetchFromTMDB } from "../../../../lib/tmdb"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query
    const movie = await fetchFromTMDB(`/movie/${id}`, {
      append_to_response: "credits",
    })

    // Cache for 1 hour at the edge
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate")
    res.status(200).json(movie)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
