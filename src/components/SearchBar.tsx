import { Input } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"

export default function SearchBar({
  onSearch,
}: {
  onSearch: (q: string) => void
}) {
  return (
    <Input
      variant="filled"
      leftSection={<IconSearch size={18} stroke={1.5} />}
      placeholder="Search movie"
      onChange={(e) => onSearch(e.currentTarget.value)}
      radius="md"
      size="sm"
    />
  )
}
