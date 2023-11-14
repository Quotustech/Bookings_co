import { NextFunction, Response } from "express";
import { AppError } from '../utils/appError'
import { Request, catchAsync } from "../utils/catchAsync";
import {Room } from '../model/room.model';


const createRoom =  catchAsync(
    async (req: Request, res:Response, next: NextFunction)=>{
        const {propertyInfo_id, name, type, price, capacity, amenities, image, description  } = req.body;

        if (!req.body) {
            next(new AppError("Please fill all the required fields", 400));
        }

        const newRoom = await Room.create({propertyInfo_id, name, type, price, capacity, amenities, image, description});
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
);

const deleteRoom = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const room_Id = req.params.id;

    const room = await Room.findById(room_Id);

    if (!room) {
      return next(new AppError(`No property found with this id ${room_Id}`, 404));
    }

    await Room.findByIdAndDelete(room_Id);

    res.status(200).json({
      status: "success",
      error: false,
      message: "Room deleted successfully",
      data: null,
    });
  }
);

const getRoomById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) =>{

    const roomId = req.params.id;

    const room = await Room.findById(roomId);
    
        if (!room) {
          return next(new AppError(`No property found with this id ${roomId}`, 404));
        }

        res.status(200).json({
          status: "success",
          error: false,
          message: "Room fetched successfully",
          data: room,
        });
  }
);

const getRooms = catchAsync(
  async (req: Request, res: Response, next: NextFunction) =>{
    const rooms = await Room.find();

    res.status(200).json({
      status: "success",
      error: false,
      message: "Rooms fetched successfully",
      totalRooms: rooms.length,
      data: rooms,
    });
  }
)

export {createRoom, updateRoom, deleteRoom,getRoomById, getRooms};