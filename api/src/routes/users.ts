import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Get all users");
});

export default router;
