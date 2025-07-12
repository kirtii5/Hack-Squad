import React from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-gray-700 shadow-md z-50 flex items-center">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center w-full">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-purple-400 tracking-wide">
          Skill Swap
        </Link>

        {/* Links */}
        <div className="space-x-4 flex items-center">
          <SignedOut>
            <Link
              to="/login"
              className="text-gray-300 hover:text-purple-400 font-medium transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-purple-600 text-white px-4 py-1.5 rounded-xl hover:bg-purple-700 transition font-medium"
            >
              Sign Up
            </Link>
          </SignedOut>

          <SignedIn>
            <Link
              to="/profile"
              className="text-purple-300 hover:text-purple-400 transition"
            >
              <User className="w-6 h-6" />
            </Link>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
