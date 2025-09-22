import MovieDetails from "@/components/MovieDetails"
import Pagination from "@/components/Pagination"

import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"

describe("MovieDetails", () => {
  it("renders movie details", () => {
    render(
      <MovieDetails
        title="Inception"
        rating={8.8}
        votes={10000}
        releaseDate="2010-07-16"
        runtime="148m"
        genres={["Sci-Fi", "Action"]}
        overview="A thief who steals corporate secrets..."
        poster="/poster.jpg"
        cast={[
          {
            id: 1,
            name: "Leonardo DiCaprio",
            role: "Cobb",
            image: "/cast.jpg",
          },
        ]}
        crew={[
          {
            id: 2,
            name: "Christopher Nolan",
            role: "Director",
            image: "/crew.jpg",
          },
        ]}
      />
    )
    expect(screen.getByText("Inception")).toBeInTheDocument()
    expect(screen.getByText("8.8")).toBeInTheDocument()
    expect(screen.getByText("Sci-Fi")).toBeInTheDocument()
    expect(screen.getByText("Leonardo DiCaprio")).toBeInTheDocument()
    expect(screen.getByText("Christopher Nolan")).toBeInTheDocument()
  })
})

describe("Pagination", () => {
  it("renders current page and total pages", () => {
    render(<Pagination page={2} totalPages={5} onPageChange={() => {}} />)
    expect(screen.getByText("2 / 5")).toBeInTheDocument()
  })

  it("disables Previous button on first page", () => {
    render(<Pagination page={1} totalPages={5} onPageChange={() => {}} />)
    expect(screen.getByText("Previous")).toBeDisabled()
  })

  it("disables Next button on last page", () => {
    render(<Pagination page={5} totalPages={5} onPageChange={() => {}} />)
    expect(screen.getByText("Next")).toBeDisabled()
  })

  it("calls onPageChange with previous page when Previous is clicked", () => {
    const onPageChange = vi.fn()
    render(<Pagination page={3} totalPages={5} onPageChange={onPageChange} />)
    fireEvent.click(screen.getByText("Previous"))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it("calls onPageChange with next page when Next is clicked", () => {
    const onPageChange = vi.fn()
    render(<Pagination page={3} totalPages={5} onPageChange={onPageChange} />)
    fireEvent.click(screen.getByText("Next"))
    expect(onPageChange).toHaveBeenCalledWith(4)
  })
})
