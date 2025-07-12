// src/pages/Signup.jsx
import React from "react";
import { SignUp } from "@clerk/clerk-react";

export default function Signup() {
  return (
    <div className="bg-gray-50 py-10 px-2 sm:px-4 min-h-[calc(100vh-64px)] flex justify-center">
      <div className="w-full max-w-md">
        <SignUp redirectUrl="/" />
      </div>
    </div>
  );
}
