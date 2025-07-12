// src/pages/LandingPage.jsx
import React from "react";
import { SignedOut } from "@clerk/clerk-react";

export default function LandingPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 text-center bg-gray-50">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-purple-700">
        Welcome to My App 🎉
      </h1>
      <p className="text-gray-600 text-base md:text-lg mb-6">
        Explore features, sign in, and get started!
      </p>

      <SignedOut>
        <p className="text-sm text-gray-500">
          Please log in or sign up to continue.
        </p>
      </SignedOut>
    </div>
  );
}
