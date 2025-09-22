import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface Movie {
  background_url: string
  title: string
  description: string
  rating: number
  year: number
  quality: string
}

interface RotatingHeroBannerProps {
  movies: Movie[]
  interval?: number
}

export default function RotatingHeroBanner({
  movies,
  interval = 6,
}: RotatingHeroBannerProps) {
  const [index, setIndex] = useState(0)

  // cycle movies
  useEffect(() => {
    if (!movies.length) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length)
    }, interval * 1000)
    return () => clearInterval(timer)
  }, [movies.length, interval])

  if (!movies.length) return null
  const movie = movies[index]

  return (
    <section className="relative bg-black w-full h-[90vh] flex items-center mt-[-78px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${movie.title}-${index}`}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={movie.background_url}
            alt={`${movie.title} background`}
            fill
            priority
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/100 via-black/40 to-transparent"
            aria-hidden="true"
          />
        </motion.div>
      </AnimatePresence>

      {/* content */}
      <div className="relative z-10 max-w-6xl px-6 lg:px-12 flex flex-col justify-center h-full">
        <motion.div
          key={`${movie.title}-content-${index}`}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.8 }}
          className="text-white max-w-2xl"
        >
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
            {movie.title}
          </h1>

          {/* meta */}
          <div className="flex items-center gap-4 mb-6 text-sm md:text-base">
            <div className="flex space-x-1">
              <span className="flex items-center gap-1 text-yellow-400 font-semibold">
                ★
              </span>
              <span>{movie.rating}</span>
            </div>
            <span className="font-[Oswald]">{movie.year}</span>
            <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
              {movie.quality}
            </span>
          </div>

          {/* description */}
          <span className="text-gray-200 block leading-relaxed mb-6 line-clamp-3 lg:text-[1.2rem]">
            {movie.description}
          </span>
        </motion.div>
      </div>
    </section>
  )
}
