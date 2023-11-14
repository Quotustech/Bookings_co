import { Router } from "express";
import {createRoom, updateRoom, deleteRoom, getRoomById, getRooms} from '../controller/room.controller';


const router = Router();

router.route("/createRoom").post(createRoom as any);

router.route("/updateRoom/:id").put(updateRoom as any);

router.route("/deleteRoom/:id").delete(deleteRoom as any);

router.route("/getRoom/:id").get(getRoomById as any);

router.route("/getRooms").get(getRooms as any);





export default router;