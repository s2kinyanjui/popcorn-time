import { useState, useEffect } from "react"
import RotatingHeroBanner from "./RotatingHeroBanner"

export default function HeroBannerContainer() {
  const [movies, setMovies] = useState<[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch popular movies on mount
  useEffect(() => {
    async function fetchMovies() {
      // Fetch movies and add them to movies state array
    }
    fetchMovies()
  }, [])

  // Loading state
  if (loading) {
    return (
      <div className="h-[90vh] flex items-center justify-center text-white">
        Loading movies...
      </div>
    )
  }

  // Empty state
  if (!movies.length) {
    return (
      <div className="h-[90vh] flex items-center justify-center text-white">
        No movies found.
      </div>
    )
  }

  // Show rotating banner
  return <RotatingHeroBanner movies={movies} interval={7} />
}
