import Feedback from "../models/Feedback.js";
import ExpressError from "../utils/ExpressError.js";

export const submitFeedback = async (req, res) => {
    const fromUser = req.auth.userId;
    const { toUser, swapId, rating, comment } = req.body;

    if (!toUser || !swapId || !rating) {
        throw new ExpressError(400, "toUser, swapId and rating are required");
    }

    if (fromUser === toUser) {
        throw new ExpressError(400, "You can't rate yourself.");
    }

    const existing = await Feedback.findOne({ swapId, fromUser });
    if (existing) {
        throw new ExpressError(400, "You have already submitted feedback for this swap.");
    }

    const feedback = await Feedback.create({
        swapId,
        fromUser,
        toUser,
        rating,
        comment,
    });

    res.status(201).json({ message: "Feedback submitted.", feedback });
};

export const getFeedbackForUser = async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        throw new ExpressError(400, "User ID is required.");
    }

    const feedbacks = await Feedback.find({ toUser: userId });

    res.status(200).json(feedbacks);
};

export const getMyFeedbackGiven = async (req, res) => {
    const userId = req.auth.userId;
    const feedbacks = await Feedback.find({ fromUser: userId });

    res.status(200).json(feedbacks);
};
