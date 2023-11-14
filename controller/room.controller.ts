import { NextFunction, Response } from "express";
import { AppError } from '../utils/appError'
import { Request, catchAsync } from "../utils/catchAsync";
import {Room } from '../model/room.model';


const createRoom =  catchAsync(
    async (req: Request, res:Response, next: NextFunction)=>{
        const {propertyInfo_id, name, type, price, capacity, amenities } = req.body;

        if (!req.body) {
            next(new AppError("Please fill all the required fields", 400));
        }

        const newRoom = await Room.create({propertyInfo_id, name, type, price, capacity, amenities});
        const totalRoom = await Room.find();

        res.status(201).json({
            status: "success",
            error: false,
            total_room: totalRoom.length,
            message: "Room registered successfully",
            data: newRoom,
        });
    }
);

const updateRoom = catchAsync(
    async (req: Request, res: Response, next: NextFunction)=>{
        const roomId = req.params.id; 
        const updateData = {
           $set: req.body, 
      };

      if (!updateData) {
        return next(new AppError("Please provide data to update", 400));
      }

      const updatedRoom = await Room.findByIdAndUpdate(
        roomId ,
        updateData,
        { new: true, runValidators: true }
      );

      if (!updatedRoom) {
        return next(new AppError("Room not found", 404));
      }

      res.status(200).json({
        status: "success",
        error: false,
        message: "Room updated successfully",
        data: updatedRoom,
      });
    }
)

export {createRoom, updateRoom};