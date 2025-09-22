import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"
import MovieDetails from "@/components/MovieDetails"

import { Loader } from "@mantine/core"
import { TMDBMovieDetail } from "../../../types/tmdb"
import { getMovieById } from "../../../lib/services"

function Movie() {
  const router = useRouter()
  const { id } = router.query

  const [loading, setLoading] = useState(true)
  const [movie, setMovie] = useState<TMDBMovieDetail>()

  // Fetch movie when ID changes
  useEffect(() => {
    if (!id) return

    async function fetchMovie() {
      // Fetch movie and add it to movie state
      try {
        const data = await getMovieById(id as string)
        setMovie(data)
      } catch (err) {
        console.error("Failed to load movie:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [id])

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader color="red" size="lg" />
      </div>
    )
  }

  // No movie found
  if (!movie) {
    return <p className="text-center mt-20">Movie not found.</p>
  }

  return (
    <div>
      <Navbar />

      <MovieDetails
        title={movie.title}
        rating={movie.vote_average}
        votes={movie.vote_count}
        releaseDate={movie.release_date}
        runtime={`${movie.runtime} min`}
        genres={movie.genres.map((g: any) => g.name)}
        overview={movie.overview}
        poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        cast={movie.credits.cast.slice(0, 10).map((actor: any) => ({
          id: actor.id,
          name: actor.name,
          role: actor.character,
          image: actor.profile_path
            ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
            : "/placeholder.jpg",
        }))}
        crew={movie.credits.crew.slice(0, 10).map((member: any) => ({
          id: member.id,
          name: member.name,
          role: member.job,
          image: member.profile_path
            ? `https://image.tmdb.org/t/p/w300${member.profile_path}`
            : "/placeholder.jpg",
        }))}
      />
    </div>
  )
}

export default Movie
