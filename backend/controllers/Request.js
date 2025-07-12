import Request from "../models/Request.js";

export const createRequest = async (req, res) => {
  try {
    const newRequest = new Request({
      from: req.auth.userId,
      to: req.body.to,
      offered: req.body.offered,
      wanted: req.body.wanted,
      message: req.body.message,
    });

    await newRequest.save();
    res.status(201).json({ message: "Request sent successfully." });
  } catch (err) {
    console.error("Error creating request:", err);
    res.status(500).json({ message: "Server error while sending request." });
  }
};
