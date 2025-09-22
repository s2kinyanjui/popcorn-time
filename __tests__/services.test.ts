import { getPopularMovies, getMovies, getMovieById } from "../lib/services"
import { TMDBMovieDetail, TMDBResponse, TMDBPopularMovie } from "../types/tmdb"

describe("TMDB service functions", () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it("fetches popular movies", async () => {
    const mockMovies: TMDBPopularMovie[] = [
      {
        background_url: "/bg.jpg",
        title: "Movie A",
        description: "Desc",
        rating: 8.2,
        year: 2020,
        quality: "HD",
      },
    ]

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockMovies,
    })

    const result = await getPopularMovies()
    expect(result).toEqual(mockMovies)
    expect(fetch).toHaveBeenCalledWith("/api/popular-movies")
  })

  it("fetches movies with query params", async () => {
    const mockResponse: TMDBResponse = {
      page: 1,
      results: [],
      total_pages: 1,
      total_results: 0,
    }

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    })

    const result = await getMovies({ page: 2, query: "batman" })
    expect(result.page).toBe(1)
    expect(fetch).toHaveBeenCalledWith("/api/movies?page=2&query=batman")
  })

  it("fetches movie by id", async () => {
    const mockMovie: TMDBMovieDetail = {
      id: 1,
      title: "Inception",
      overview: "Mind-bending",
      runtime: 148,
      release_date: "2010-07-16",
      poster_path: "/poster.jpg",
      backdrop_path: "/backdrop.jpg",
      vote_average: 8.8,
      vote_count: 1000,
      genres: [],
      credits: { cast: [], crew: [] },
    }

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockMovie,
    })

    const result = await getMovieById(1)
    expect(result.title).toBe("Inception")
    expect(fetch).toHaveBeenCalledWith("/api/movie/1")
  })

  it("throws error on bad response", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      statusText: "Not Found",
    })

    await expect(getMovieById(99)).rejects.toThrow(
      "Failed to fetch /api/movie/99: Not Found"
    )
  })
})
