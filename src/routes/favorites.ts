import express from "express";
import { favoritesController } from "../controllers/favorites";
const router = express.Router();
const { getFavorites, setFavorites } = favoritesController;

router.get("/", getFavorites);
router.post("/", setFavorites);

export default router;
