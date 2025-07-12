import React from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-50 flex items-center">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-purple-700">
          Skill Swap
        </Link>

        <div className="space-x-4 flex items-center">
          <SignedOut>
            <Link
              to="/login"
              className="text-gray-700 hover:text-purple-700 font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-purple-700 text-white px-4 py-1.5 rounded hover:bg-purple-800 font-medium"
            >
              Sign Up
            </Link>
          </SignedOut>

          <SignedIn>
            <Link to="/profile" className="text-purple-700 hover:text-purple-900">
              <User className="w-6 h-6" />
            </Link>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
