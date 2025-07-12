import React from "react";
import { Routes, Route } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import SwapRequest from "./components/SwapRequest";

function App() {
  return (
      <Routes>
        <Route path="/" element={<UserProfile />} />
        <Route path="/swap" element={<SwapRequest />} />
      </Routes>
  );
}

export default App;

