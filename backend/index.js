import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import UserProfile from './routes/UserProfile.js';
import SwapRequest from './routes/SwapRequest.js';
import Feedback from './routes/Feedback.js';

dotenv.config();

const app = express();
const { MONGO_URL, PORT } = process.env;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB is connected successfully'))
  .catch((err) => console.error(err));

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/profile", UserProfile);
app.use('/swap', SwapRequest);
app.use('/feedback', Feedback);

app.use((err, req, res, next) => {
  console.log(err.stack);
  const status = err.status || 500;
  const message = err.message || "Internal server error";
  res.status(status).json({ message });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
