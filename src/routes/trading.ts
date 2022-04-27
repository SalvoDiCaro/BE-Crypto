import express from "express";
import { tradingController } from "../controllers/trading";
const router = express.Router();
const { getTrading, addTrading } = tradingController;

router.get("/", getTrading);
router.post("/", addTrading);

export default router;
