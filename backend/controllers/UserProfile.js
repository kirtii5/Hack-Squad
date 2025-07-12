import UserProfile from '../models/UserProfile.js';

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
      profilePhoto: ""
    };
  }

  res.status(200).json(profile);
};

export const updateMyProfile = async (req, res) => {
  const clerkId = req.auth.userId;

  const {
    location = "",
    skillsOffered = [],
    skillsWanted = [],
    availability = "",
    isPublic = true,
    profilePhoto = ""
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
      clerkId
    },
    { new: true, upsert: true }
  );

  res.status(200).json({
    message: "Profile updated successfully.",
    profile: updatedProfile
  });
};
