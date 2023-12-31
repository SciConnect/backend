import express from "express";
import {
   getUsers,
   loginUser,
   registerUser,
   updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update", updateUser);

export {router as userRoute}
