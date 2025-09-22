const API_KEY = process.env.TMDB_API_KEY as string
const BASE_URL = "https://api.themoviedb.org/3"

// Generic fetcher from TMDB with API key + caching ( to be used in API routes)
export async function fetchFromTMDB(
  endpoint: string,
  params: Record<string, any> = {}
) {
  const url = new URL(`${BASE_URL}${endpoint}`)
  url.searchParams.set("api_key", API_KEY)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))

  // Cache for 5 minutes
  const res = await fetch(url.toString(), { next: { revalidate: 300 } })
  if (!res.ok) throw new Error(`TMDB API error: ${res.status}`)

  return res.json()
}
