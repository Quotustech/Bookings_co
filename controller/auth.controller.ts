// import User from ''
import express from 'express';
import bcrypt from 'bcryptjs';
import { NextFunction, Response } from "express";
import User from "../model/user.model";
import { Request, catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/appError";


const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, role, password } = req.body;

    if (!req.body) {
      next(new AppError("Please fill all the required fields", 400));
    }

    const users = await User.find()
        if (users.some(user => user.email === email)) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("auth token", hashedPassword)

        const newUser = new User({ name, email: email, password: hashedPassword ,role:role});
        const savedUser = await newUser.save();
        res.status(200).json({ savedUser, message: 'User registered successfully' });
  }
);

// const Login = catchAsync(
//   async(req:Request, res:Response, next:NextFunction) =>{

//   }
// )

// Update a user
const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const { name, email, password } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      next(new AppError(`No user found with this id ${userId}`, 404));
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, password },
      { new: true }
    );

    res.json(updatedUser);
  }
);

const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      next(new AppError(`No user found with this id ${userId}`, 404));
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({
      message: "User deleted successfully",
    });
  }
);

// Get a specific user
const getUserById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      next(new AppError(`No user found with this id ${userId}`, 404));
    }
    res.status(200).json({
      message: "User fetched successfully",
      data: user,
    });
  }
);

// Get all users
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(200).json({
    message: "Users fetched successfully",
    totalUsers: users.length,
    data: users,
  });
});

export { register, updateUser, deleteUser, getUserById, getAllUsers };
