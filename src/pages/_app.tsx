import type { AppProps } from "next/app"
import { createTheme, MantineProvider } from "@mantine/core"
import "@/styles/globals.css"
import "@mantine/core/styles.css"
import { SessionProvider } from "next-auth/react"

const theme = createTheme({
  fontFamily: "EudoxusSans",
})

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <MantineProvider theme={theme}>
        <Component {...pageProps} />
      </MantineProvider>
    </SessionProvider>
  )
}
