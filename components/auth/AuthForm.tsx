"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import AuthInput from "./AuthInput";

interface Props {
  variant: "login" | "signup";
}

const AuthForm: React.FC<Props> = ({ variant }) => {

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submit = async () => {

    setLoading(true);
    setMessage("");

    try {

      // SIGNUP (keep your existing API)
      if (variant === "signup") {

        const res = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setMessage(data);
          setLoading(false);
          return;
        }

        setMessage("Signup successful! Please login.");
        setLoading(false);
        return;
      }

      // LOGIN using NextAuth
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setMessage("Invalid credentials");
        setLoading(false);
        return;
      }

      setMessage("Login successful!");

      // redirect after login
      router.push("/profiles");

    } catch (error) {

      setMessage("Something went wrong");

    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">

      {variant === "signup" && (
        <AuthInput
          placeholder="Username"
          type="text"
          value={name}
          onChange={setName}
        />
      )}

      <AuthInput
        placeholder="Email"
        type="email"
        value={email}
        onChange={setEmail}
      />

      <AuthInput
        placeholder="Password"
        type="password"
        value={password}
        onChange={setPassword}
      />

      {message && (
        <p className="text-green-500 text-sm">
          {message}
        </p>
      )}

      <button
        onClick={submit}
        disabled={loading}
        className="bg-red-600 py-3 text-white rounded-md hover:bg-red-700"
      >
        {loading
          ? "Loading..."
          : variant === "login"
          ? "Login"
          : "Sign Up"}
      </button>

    </div>
  );
};

export default AuthForm;
