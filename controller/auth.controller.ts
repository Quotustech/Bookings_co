// import User from ''
import express from 'express';
import bcrypt from 'bcryptjs';
import { NextFunction, Response } from "express";
import User from "../model/user.model";
import { Request, catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/appError";
import jwt from "jsonwebtoken"
import { Role, assignToken } from '../utils/jwtHelper';



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

    const newUser = new User({ name, email: email, password: hashedPassword, role: role });
    const savedUser = await newUser.save();
    res.status(200).json({ savedUser, message: 'User registered successfully' });
  }
);

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const users = await User.find()
      const user = users.find(u => u.email === email);
      console.log("loged data", user)

      if (!user) {
        return res.status(401).json({ message: 'Invalid email' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log("password", passwordMatch)
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid Password' });
      }
      const payload = { id: user.id, email: user.email, role: user.role as Role };
      const secretKey = 'key'
      const expiresIn = '7d';
      const token = assignToken(payload, secretKey, expiresIn);
      return res.status(200).json({ token, message: 'User login successfully' });

    }
    catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }

  }
)

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

export { register, updateUser, deleteUser, getUserById, getAllUsers,login };
