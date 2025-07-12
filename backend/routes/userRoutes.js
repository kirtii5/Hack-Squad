import express from 'express';
const router = express.Router();

router.get('/user-profile', (req, res) => {
  res.json({
    name: "John Doe",
    location: "Mumbai, India",
    skillsOffered: ["React", "Node.js"],
    skillsWanted: ["Python", "AWS"],
    availability: "Weekends",
    profileType: "Public"
  });
});

export default router;
