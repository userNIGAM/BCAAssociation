import express from "express"
import { registerTeam } from "../controllers/teamController"

const router = express.Router();

router.post("/register", registerTeam)