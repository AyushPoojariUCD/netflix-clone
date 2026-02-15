"use client";

import { useState } from "react";
import AuthForm from "./AuthForm";

const AuthCard = () => {

  const [variant, setVariant] =
    useState<"login" | "signup">("login");

  const toggleVariant = () => {
    setVariant(
      variant === "login"
        ? "signup"
        : "login"
    );
  };

  return (
    <div className="bg-black/70 px-12 py-16 rounded-md w-full max-w-md">

      <h2 className="text-white text-4xl mb-8 font-semibold">
        {variant === "login"
          ? "Sign In"
          : "Sign Up"}
      </h2>

      <AuthForm variant={variant} />

      <p className="text-neutral-400 mt-8">

        {variant === "login"
          ? "New here?"
          : "Already have an account?"}

        <span
          onClick={toggleVariant}
          className="text-white ml-1 cursor-pointer"
        >
          {variant === "login"
            ? "Create account"
            : "Sign in"}
        </span>

      </p>

    </div>
  );
};

export default AuthCard;
