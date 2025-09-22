export default function SearchHeader({ query }: { query: string }) {
  return (
    <h2 className="text-xl md:text-2xl font-semibold mb-6">
      Showing results for: <span className="italic">“ {query} ”</span>
    </h2>
  )
}
