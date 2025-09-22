import { useEffect, useState } from "react"
import { Button } from "@mantine/core"
import { IconArrowUp } from "@tabler/icons-react"

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  // Show button after scrolling past 800px
  useEffect(() => {
    const toggleVisibility = () => setVisible(window.scrollY > 800)
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 sm:bottom-8 sm:right-8">
      <Button
        onClick={scrollToTop}
        w={56}
        h={56}
        p={0}
        size="lg"
        color="red"
        className="shadow-md"
      >
        <IconArrowUp size={20} />
      </Button>
    </div>
  )
}
