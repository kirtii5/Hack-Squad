import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true
    },
    location: {
      type: String,
      default: ""
    },
    skillsOffered: {
      type: [String],
      default: []
    },
    skillsWanted: {
      type: [String],
      default: []
    },
    availability: {
      type: String,
      default: ""
    },
    isPublic: {
      type: Boolean,
      default: true
    },
    profilePhoto: {
      type: String,
    }
  },
  { timestamps: true }
);

export default mongoose.model("UserProfile", UserProfileSchema);
