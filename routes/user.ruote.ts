import { Router } from "express";
import {
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
} from "../controller/auth.controller";

const router = Router();

router.route("/").get(getAllUsers as any);

router
  .route("/:id")
  .put(updateUser as any)
  .delete(deleteUser as any)
  .get(getUserById as any);

export default router;
