import React from "react";
import { SignUp } from "@clerk/clerk-react";

export default function Signup() {
  return (
    <div className="min-h-screen pt-24 px-4 bg-black text-white relative overflow-hidden">
      {/* Gradient blurred background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 
                      bg-[length:200%_200%] animate-gradient-x blur-2xl opacity-20 z-0" />

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-96px)]">
        <div className="w-full max-w-md">
          <SignUp redirectUrl="/" />
        </div>
      </div>
    </div>
  );
}
