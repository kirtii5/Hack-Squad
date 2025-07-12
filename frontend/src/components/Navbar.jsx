// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";
import { Button } from "./ui/button.jsx";

export default function Navbar() {
  const clerk = useClerk();
  const navigate = useNavigate();
  const handleLogout = () => {
    clerk.signOut();
    navigate("/");
  };
  return (
    <nav className="bg-white shadow-md z-10 relative">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-purple-700">
          MyApp
        </Link>

        <div className="space-x-4">
          <Link
            to="/"
            className="text-gray-700 hover:text-purple-700 font-medium">
            Home
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-purple-700 font-medium">
            Contact
          </Link>

          <SignedOut>
            <Link
              to="/login"
              className="text-gray-700 hover:text-purple-700 font-medium">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-purple-700 text-white px-3 py-1 rounded hover:bg-purple-800 font-medium">
              Sign Up
            </Link>
          </SignedOut>

          <SignedIn>
            <Button onClick={handleLogout}>Logout</Button>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
