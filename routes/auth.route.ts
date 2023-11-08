import { Router, Request, Response, NextFunction } from "express";
import { register,login } from "../controller/auth.controller";

// const userController = require('../controller/auth.controller');

const router = Router();

router.route("/register").post(register as any);

router.route("/login").post(login as any);






router.use((req: Request, res: Response, next: NextFunction) => {
    if (!req.path) {
      res.status(404).json({ error: "URL not found" });
    } else {
      next();
    }
  });

export default router;
