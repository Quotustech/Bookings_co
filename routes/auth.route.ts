import { Router } from "express";
import { register } from "../controller/auth.controller";
// const userController = require('../controller/userController');

const router = Router();

router.route("/register").post(register as any);

export default router;
