import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    swapId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SwapRequest",
        required: true,
    },
    fromUser: {
        type: String,
        required: true,
    },
    toUser: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        maxlength: 500,
    },
}, {
    timestamps: true,
});

export default mongoose.model("Feedback", feedbackSchema);
