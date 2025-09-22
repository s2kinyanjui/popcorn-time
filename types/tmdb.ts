export type TMDBMovie = {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
}

export type TMDBResponse = {
  page: number
  results: TMDBMovie[]
  total_pages: number
  total_results: number
}

export type TMDBGenre = {
  id: number
  name: string
}

export type TMDBCast = {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
}

export type TMDBCrew = {
  id: number
  name: string
  job: string
  profile_path: string | null
  department: string
}

export type TMDBCredits = {
  cast: TMDBCast[]
  crew: TMDBCrew[]
}

export type TMDBMovieDetail = {
  id: number
  title: string
  overview: string
  runtime: number | null
  release_date: string
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  vote_count: number
  genres: TMDBGenre[]
  credits: TMDBCredits
}

export type TMDBPopularMovie = {
  background_url: string
  title: string
  description: string
  rating: number
  year: number
  quality: string
}
