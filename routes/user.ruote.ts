import { Router } from "express";
import { register,updateUser,deleteUser,getAllUsers,getUserById } from "../controller/auth.controller";
import { Request, Response, NextFunction } from 'express';

const router = Router();


router.route("/updateUser").put(updateUser as any);

router.route("/deleteUser").delete(deleteUser as any);

router.route("/getAllUser").get(getAllUsers as any);

router.route("/getUser").get(getUserById as any);

router.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).json({ error: "URL not found" });
   
  });

export default router;