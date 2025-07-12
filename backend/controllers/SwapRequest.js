import SwapRequest from "../models/SwapRequest.js";
import ExpressError from "../utils/ExpressError.js";

// export const createSwapRequest = async (req, res) => {
//   const { recipient, skillOffered, skillWanted } = req.body;
//   const requester = req.auth.userId;

//   const swap = new SwapRequest({
//     requester,
//     recipient,
//     skillOffered,
//     skillWanted
//   });

//   await swap.save();

//   res.status(201).json({
//     message: "Swap request created successfully.",
//     swap
//   });
// };

export const createSwapRequest = async (req, res) => {
  console.log("BODY:", req.body);
  console.log("AUTH:", req.auth);

  const { recipient, skillOffered, skillWanted } = req.body;
  const requester = req.auth.userId;

  console.log("Requester:", requester);

  const swap = new SwapRequest({
    requester,
    recipient,
    skillOffered,
    skillWanted
  });

  await swap.save();

  res.status(201).json({
    message: "Swap request created successfully.",
    swap
  });
};


export const getMySwaps = async (req, res) => {
  const userId = req.auth.userId;

  const swaps = await SwapRequest.find({
    $or: [
      { requester: userId },
      { recipient: userId }
    ]
  }).sort({ createdAt: -1 });

  res.status(200).json(swaps);
};

export const acceptSwap = async (req, res) => {
  const swapId = req.params.id;
  const userId = req.auth.userId;

  const swap = await SwapRequest.findOneAndUpdate(
    { _id: swapId, recipient: userId, status: 'pending' },
    { status: 'accepted' },
    { new: true }
  );

  if (!swap) {
    throw new ExpressError(404, "Swap not found or not authorized.");
  }

  res.status(200).json({ message: "Swap accepted.", swap });
};

export const rejectSwap = async (req, res) => {
  const swapId = req.params.id;
  const userId = req.auth.userId;

  const swap = await SwapRequest.findOneAndUpdate(
    { _id: swapId, recipient: userId, status: 'pending' },
    { status: 'rejected' },
    { new: true }
  );

  if (!swap) {
    throw new ExpressError(404, "Swap not found or not authorized.");
  }

  res.status(200).json({ message: "Swap rejected.", swap });
};

export const cancelSwap = async (req, res) => {
  const swapId = req.params.id;
  const userId = req.auth.userId;

  const swap = await SwapRequest.findOneAndDelete({
    _id: swapId,
    requester: userId,
    status: 'pending'
  });

  if (!swap) {
    throw new ExpressError(404, "Swap not found or not authorized.");
  }

  res.status(200).json({ message: "Swap cancelled.", swap });
};
