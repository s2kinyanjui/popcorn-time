import { TMDBMovieDetail, TMDBPopularMovie, TMDBResponse } from "../types/tmdb"

// Fetcher with error handling
const fetcher = async <T>(url: string): Promise<T> => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`)
  return (await res.json()) as T
}

/* Services - to help fetch data easily on the frontend , assist in maintainability */

// Popular movies
export const getPopularMovies = () =>
  fetcher<TMDBPopularMovie[]>("/api/popular-movies")

// Paginated or searched movies
export const getMovies = (params?: { page?: number; query?: string }) => {
  const searchParams = new URLSearchParams()
  if (params?.page) searchParams.append("page", String(params.page))
  if (params?.query) searchParams.append("query", params.query)

  const queryString = searchParams.toString()
  return fetcher<TMDBResponse>(
    `/api/movies${queryString ? `?${queryString}` : ""}`
  )
}

// Single movie details
export const getMovieById = (id: string | number) =>
  fetcher<TMDBMovieDetail>(`/api/movie/${id}`)
