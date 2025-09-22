import { Modal, TextInput, PasswordInput, Button } from "@mantine/core"
import React, { useState } from "react"
import { signIn } from "next-auth/react"
import * as yup from "yup"
import Image from "next/image"

// Validation schema for email and password
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
})

type SignInModalProps = {
  opened: boolean
  onClose: () => void
}

export default function SignInModal({ opened, onClose }: SignInModalProps) {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  )

  // Handle login with credentials
  const handleCredentialsLogin = async () => {
    try {
      // Validate inputs
      await schema.validate({ email, password }, { abortEarly: false })
      setErrors({})

      // Call next-auth signIn
      setLoading(true)
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      })
      setLoading(false)

      // Close modal if success
      if (res?.ok) {
        onClose()
      } else {
        alert("Invalid credentials")
      }
    } catch (err: unknown) {
      // Validation errors
      if (err instanceof yup.ValidationError) {
        const formErrors: { email?: string; password?: string } = {}
        err.inner.forEach((e: yup.ValidationError) => {
          if (e.path) formErrors[e.path as "email" | "password"] = e.message
        })
        setErrors(formErrors)
      } else {
        console.error("Unexpected error during login:", err)
      }
    }
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="sm"
      classNames={{
        body: "flex flex-col items-center space-y-6",
      }}
    >
      {/* Logo */}
      <Image src="/logo.png" alt="Logo" width={250} height={48} />

      {/* Header */}
      <div>
        <h1 className="font-bold text-2xl text-center">
          Sign in to your account
        </h1>
        <p className="text-sm mt-2 font-light text-center">
          Handpicked movie suggestions, just for you.
        </p>
      </div>

      {/* Form inputs */}
      <div className="w-full space-y-4">
        <TextInput
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          error={errors.email}
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          error={errors.password}
        />
      </div>

      {/* Demo note */}
      <span className="text-red-500 text-[0.6rem]">
        Note: For demo purposes, use any email and password combination
      </span>

      {/* Sign in button */}
      <Button
        onClick={handleCredentialsLogin}
        loading={loading}
        fullWidth
        size="md"
        color="red"
      >
        Sign in
      </Button>
    </Modal>
  )
}
