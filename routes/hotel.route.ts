import { Router, Request, Response, NextFunction } from "express";
import {getAllHotels, getAllHotelBySearch, getHotelById} from '../controller/hotel.controller';


const router = Router();

router.route("/allHotel").get(getAllHotels as any);

router.route("/hotels").get(getAllHotelBySearch as any);

router.route("/hotel/:id").get(getHotelById as any)



export default router;