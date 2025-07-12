import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const BASE_URL = "/api/profile";

// Get current user's profile
export const getMyProfile = async (token) => {
    const res = await axios.get("/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return res.data;
  };

// Update current user's profile
export const updateMyProfile = async (profileData, token) => {
  const res = await axios.put(`${BASE_URL}/update`, profileData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return res.data;
};

// Get public user profile
export const getPublicProfile = async (clerkId) => {
    const res = await axios.get(`/api/profile/${clerkId}`);
    return res.data;
  };
  
