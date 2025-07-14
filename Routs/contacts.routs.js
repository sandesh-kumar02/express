// create route
import express from 'express';
const router = express.Router();

router.get("/", (req, res) => {
  res.send("root id defined");
});

export default router;