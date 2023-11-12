import { Router, Request, Response, NextFunction } from "express";
import {queryHandler} from '../controller/query.controller';
import {protect} from '../middlewares/auth.middleware'


const router = Router();

router.route("/query").post(protect as any,queryHandler as any);


export default router;