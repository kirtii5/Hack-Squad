import mongoose from "mongoose";

const swapRequestSchema = new mongoose.Schema({
  requester: {
    type: String,
    required: true
  },
  recipient: {
    type: String,
    required: true
  },
  skillOffered: {
    type: [String],
    required: true
  },
  skillWanted: {
    type: [String],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
});

export default mongoose.model("SwapRequest", swapRequestSchema);
