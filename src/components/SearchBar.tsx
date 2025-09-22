import { Input } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"

export default function SearchBar({
  onSearch,
}: {
  onSearch: (q: string) => void
}) {
  return (
    <Input
      leftSection={<IconSearch size={18} stroke={1.5} />}
      placeholder="Search"
      onChange={(e) => onSearch(e.currentTarget.value)}
      radius="md"
      size="sm"
    />
  )
}
