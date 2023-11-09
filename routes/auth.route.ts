import { Router, Request, Response, NextFunction } from "express";
import { register, login } from "../controller/auth.controller";

// const userController = require('../controller/auth.controller');

const router = Router();

router.route("/register").post(register as any);

router.route("/login").post(login as any);

export default router;
