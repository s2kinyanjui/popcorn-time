import Image from "next/image"

interface CastMember {
  id: number | string
  name: string
  role: string
  image: string
}

interface CrewMember {
  id: number | string
  name: string
  role: string
  image: string
}

interface MovieDetailsProps {
  title: string
  rating: number
  votes: number
  releaseDate: string
  runtime: string
  genres: string[]
  overview: string
  poster: string
  cast: CastMember[]
  crew: CrewMember[]
}

export default function MovieDetails({
  title,
  rating,
  votes,
  releaseDate,
  runtime,
  genres,
  overview,
  poster,
  cast,
  crew,
}: MovieDetailsProps) {
  return (
    <section className="flex flex-col md:flex-row gap-8 md:gap-12 max-w-6xl mx-auto px-6 py-10">
      {/* Poster */}
      <div className="flex-shrink-0 md:w-1/2">
        <Image
          src={poster}
          alt={title}
          width={600}
          height={500}
          className="w-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col justify-start md:w-1/2">
        <h1 className="text-4xl font-bold">{title}</h1>

        {/* Rating + Meta */}
        <div className="flex flex-wrap items-center justify-between mt-4 text-gray-700">
          <div className="flex space-x-1">
            <span className="flex items-center gap-1 text-yellow-400 font-semibold">
              ★
            </span>
            <span>{rating.toFixed(1)}</span>
            <span>({votes} votes)</span>
          </div>
          <span>{releaseDate}</span>
          <span className="text-red-500 font-medium">{runtime}</span>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-2 mt-4">
          {genres.map((genre) => (
            <span
              key={genre}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Overview */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Overview</h2>
          <p className="text-gray-600 leading-relaxed">{overview}</p>
        </div>

        {/* Cast */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Cast</h2>
          <div className="flex gap-6 overflow-x-auto scrollbar-hide">
            {cast.map((member) => (
              <div key={member.id} className="flex-shrink-0 w-20">
                <div className="w-full aspect-[2/3] relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-2 text-sm font-semibold">{member.name}</h3>
                <p className="text-gray-500 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Crew */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Crew</h2>
          <div className="flex gap-6 overflow-x-auto scrollbar-hide">
            {crew.map((member) => (
              <div key={member.id} className="flex-shrink-0 w-20">
                <div className="w-full aspect-[2/3] relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-2 text-sm font-semibold">{member.name}</h3>
                <p className="text-gray-500 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
