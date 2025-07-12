import React, { useState } from "react";
import { SignIn, SignUp } from "@clerk/clerk-react";

export default function AuthPage() {
  const [mode, setMode] = useState("login");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-center mb-4 space-x-4">
          <button
            onClick={() => setMode("login")}
            className={`px-4 py-2 rounded font-medium ${
              mode === "login"
                ? "bg-purple-700 text-white"
                : "bg-gray-200 text-gray-700"
            }`}>
            Login
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`px-4 py-2 rounded font-medium ${
              mode === "signup"
                ? "bg-purple-700 text-white"
                : "bg-gray-200 text-gray-700"
            }`}>
            Sign Up
          </button>
        </div>

        {mode === "login" ? (
          <SignIn redirectUrl="/" />
        ) : (
          <SignUp redirectUrl="/" />
        )}
      </div>
    </div>
  );
}
