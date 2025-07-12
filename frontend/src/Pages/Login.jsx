// src/pages/Login.jsx
import React from "react";
import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-2 sm:px-4 bg-gray-50">
      <SignIn redirectUrl="/" />
    </div>
  );
}
