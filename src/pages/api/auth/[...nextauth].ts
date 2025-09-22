import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export default NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Mock user object (demo purpose only)
        if (credentials?.email) {
          return {
            id: "1",
            name: credentials.email.split("@")[0].toUpperCase(),
            email: credentials.email,
          }
        }

        return null
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
})
