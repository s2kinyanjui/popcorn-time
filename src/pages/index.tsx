import BackToTop from "@/components/BackToTop"

import MovieCard from "@/components/MovieCard"
import Navbar from "@/components/Navbar"
import Pagination from "@/components/Pagination"
import SearchBar from "@/components/SearchBar"
import SearchHeader from "@/components/SearchHeader"

import { Loader } from "@mantine/core"
import { useDebouncedValue } from "@mantine/hooks"
import React, { useEffect, useState } from "react"
import HeroBannerContainer from "@/components/HeroBanner"

import { TMDBMovie } from "../../types/tmdb"

function Home() {
  const [query, setQuery] = useState<string>("")
  const [page, setPage] = useState<number>(1)
  const [movies, setMovies] = useState<TMDBMovie[]>([])
  const [totalPages, setTotalPages] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)

  const [debouncedQuery] = useDebouncedValue(query, 750)

  useEffect(() => {
    const fetchMovies = async () => {
      // Fetch movies and put them in movies state array
    }

    fetchMovies()
  }, [debouncedQuery, page])

  return (
    <div>
      {/* Top nav: Logo & Sign In */}
      <Navbar />
      <HeroBannerContainer />

      <div className="px-6 md:px-12 py-8">
        <div className="flex w-full justify-end mb-4">
          <SearchBar onSearch={setQuery} />
        </div>

        {debouncedQuery.trim() && <SearchHeader query={debouncedQuery} />}

        {/* Grid of results */}
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.title}
                year={movie.release_date?.split("-")[0]}
                rating={movie.vote_average}
                description={movie.overview}
                poster_url={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                href={`/movie/${movie.id}`}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      <BackToTop />
    </div>
  )
}

export default Home
