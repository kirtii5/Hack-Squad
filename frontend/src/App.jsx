// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <>
              <SignedIn>
                <div className="p-10">
                  <h1 className="text-2xl font-bold">Dashboard</h1>
                  <UserButton afterSignOutUrl="/login" />
                </div>
              </SignedIn>
              <SignedOut>
                <Login />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
