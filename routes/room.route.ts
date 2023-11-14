import { Router, Request, Response, NextFunction } from "express";
import {createRoom, updateRoom} from '../controller/room.controller';


const router = Router();

router.route("/createRoom").post(createRoom as any);

router.route("/updateRoom/:id").put(updateRoom as any);






export default router;