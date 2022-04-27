import express from "express";
import { usersController } from "../controllers/users";
const router = express.Router();
const { signUp, signIn } = usersController;

router.post("/signup", signUp);
router.post("/signin", signIn);

export default router;
