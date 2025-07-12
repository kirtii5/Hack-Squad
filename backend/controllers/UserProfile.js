// controllers/UserProfile.js

import UserProfile from "../models/UserProfile.js";

// Get your own profile
export const getMyProfile = async (req, res) => {
  const clerkId = req.auth.userId;

  let profile = await UserProfile.findOne({ clerkId });

  if (!profile) {
    profile = {
      location: "",
      skillsOffered: [],
      skillsWanted: [],
      availability: "",
      isPublic: true,
      profilePhoto: "",
    };
  }

  res.status(200).json(profile);
};

// Update your own profile
export const updateMyProfile = async (req, res) => {
  const clerkId = req.auth.userId;

  const {
    location = "",
    skillsOffered = [],
    skillsWanted = [],
    availability = "",
    isPublic = true,
    profilePhoto = "",
  } = req.body;

  const updatedProfile = await UserProfile.findOneAndUpdate(
    { clerkId },
    {
      location,
      skillsOffered,
      skillsWanted,
      availability,
      isPublic,
      profilePhoto,
      clerkId,
    },
    { new: true, upsert: true }
  );

  res.status(200).json({
    message: "Profile updated successfully.",
    profile: updatedProfile,
  });
};

// Get one public profile by clerkId
export const getPublicProfile = async (req, res) => {
  const { clerkId } = req.params;

  const profile = await UserProfile.findOne({ clerkId, isPublic: true });

  if (!profile) {
    return res
      .status(404)
      .json({ message: "User not found or profile is private" });
  }

  res.status(200).json(profile);
};

// ✅ Get ALL public profiles
export const getAllPublicProfiles = async (req, res) => {
  try {
    const profiles = await UserProfile.find({ isPublic: true });
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json({ message: "Server error fetching profiles" });
  }
};
