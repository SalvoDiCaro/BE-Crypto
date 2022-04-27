import express from "express";
import { cryptosController } from "../controllers/cryptos";
const router = express.Router();
const { getCryptos } = cryptosController;

router.get("/", getCryptos);

export default router;
