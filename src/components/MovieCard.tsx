import Image from "next/image"
import { IconStar } from "@tabler/icons-react"
import Link from "next/link"

interface MovieCardProps {
  title: string
  year: string
  rating: number
  description: string
  poster_url: string
  href: string
}

export default function MovieCard({
  title,
  year,
  rating,
  description,
  poster_url,
  href,
}: MovieCardProps) {
  return (
    <Link href={href} className="block">
      <div className="bg-white hover:scale-105 transition p-3 flex flex-col">
        <Image
          src={poster_url}
          alt={title}
          width={300}
          height={400}
          className="object-cover w-full h-auto"
        />
        <h3 className="text-lg font-bold mt-3">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        <div className="flex justify-between items-center mt-2 text-sm">
          <span className="text-gray-500 font-[Oswald]">{year}</span>
          <span className="flex items-center gap-1 text-yellow-500 font-medium">
            <IconStar size={16} fill="currentColor" stroke={0} />
            {rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  )
}
