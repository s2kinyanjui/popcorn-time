import Link from "next/link"
import { Button, Avatar, Menu } from "@mantine/core"
import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import SignInModal from "./SignInModal"

export default function Navbar() {
  const [opened, setOpened] = useState<boolean>(false)
  const { data: session } = useSession()

  return (
    <div className="sticky top-0 left-0 right-0 w-full z-20 flex justify-between items-center px-6 md:px-12 py-4 backdrop-blur-xl">
      {/* Logo */}
      <Link href="/" passHref>
        <img src="/logo.png" alt="Logo" className=" h-[24px] lg:h-[36px]" />
      </Link>

      {/* Right side */}
      {session ? (
        <div className="flex items-center space-x-4">
          {/* Desktop view (md and up) */}
          <div className="hidden md:flex items-center space-x-4">
            <Avatar
              src={session.user?.image || undefined}
              radius="xl"
              color="red"
              variant="filled"
            >
              {session.user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar>

            <div className="flex flex-col">
              <span className="font-bold text-gray-500">
                {session.user?.name}
              </span>
              <span className="text-sm text-gray-500">
                {session.user?.email}
              </span>
            </div>

            <Button color="red" variant="transparent" onClick={() => signOut()}>
              Log out
            </Button>
          </div>

          {/* Mobile view (below md) */}
          <div className="md:hidden">
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Avatar
                  src={session.user?.image || undefined}
                  radius="xl"
                  color="red"
                  variant="filled"
                  className="cursor-pointer"
                >
                  {session.user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Avatar>
              </Menu.Target>

              <Menu.Dropdown>
                <div className="flex flex-col p-4">
                  <span className="font-bold">{session.user?.name}</span>
                  <span className="text-sm text-gray-500">
                    {session.user?.email}
                  </span>
                </div>
                <Menu.Divider />
                <Menu.Item color="red" onClick={() => signOut()}>
                  Log out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>
      ) : (
        <>
          <Button
            variant="transparent"
            color="red"
            onClick={() => setOpened(true)}
          >
            Sign In
          </Button>
          <SignInModal opened={opened} onClose={() => setOpened(false)} />
        </>
      )}
    </div>
  )
}
