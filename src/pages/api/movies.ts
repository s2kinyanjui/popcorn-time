import type { NextApiRequest, NextApiResponse } from "next"
import { fetchFromTMDB } from "../../../lib/tmdb"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { page = "1", query } = req.query

    const pageNum = Array.isArray(page) ? page[0] : page
    const queryStr = Array.isArray(query) ? query[0] : query

    let data
    if (queryStr && queryStr.trim().length > 0) {
      data = await fetchFromTMDB("/search/movie", {
        query: queryStr,
        page: pageNum,
      })
    } else {
      data = await fetchFromTMDB("/movie/popular", { page: pageNum })
    }

    // Cache for 5 minutes
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate")
    res.status(200).json(data)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
