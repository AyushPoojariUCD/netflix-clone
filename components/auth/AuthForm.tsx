"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

    const endpoint =
      variant === "login"
        ? "/api/login"
        : "/api/register";

    const body =
      variant === "login"
        ? { email, password }
        : { name, email, password };

    try {

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data);
        setLoading(false);
        return;
      }

      if (variant === "signup") {

        setMessage("Signup successful! Please login.");

      } else {

        setMessage("Login successful!");

        // Save user session
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        // Redirect to profiles
        setTimeout(() => {
          router.push("/profiles");
        }, 1000);
      }

    } catch {
      setMessage("Error occurred");
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
