// import User from ''
import express from "express";
import bcrypt from "bcryptjs";
import { NextFunction, Response } from "express";
import User from "../model/user.model";
import { Request, catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/appError";
import jwt from "jsonwebtoken";
import { Role, assignToken } from "../utils/jwtHelper";
import { compareHash } from "../utils/bcryptHelper";

const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, role, password } = req.body;

    if (!req.body) {
      next(new AppError("Please fill all the required fields", 400));
    }

    const user = await User.find({
      email,
    });

    if (user.length) {
      next(new AppError("An user is already exits with this email", 400));
    }

    const newUser = await User.create({ name, email, password, role: role });

    res.status(201).json({
      status: "success",
      error: false,
      message: "User registered successfully",
      data: newUser,
    });
  }
);

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const users = await User.find().byEmail(email);

    if (!email || !password) {
      return next(
        new AppError("Please provide all the required credentials", 400)
      );
    }

    if (!users.length || !(await compareHash(password, users[0]?.password))) {
      next(new AppError("Invalid email or password", 401));
    }

    const accessToken = assignToken(
      {
        id: users[0]?.id,
        email: users[0]?.email,
        role: users[0]?.role as Role,
      },
      process.env.JWT_SECRET_KEY!,
      process.env.JWT_EXPIRES_IN!
    );

    return res.status(200).json({
      status: "success",
      error: false,
      message: "User login successfully",
      data: {
        accessToken,
      },
    });
  }
);

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

    return res.status(200).json({
      status: "success",
      error: false,
      message: "User updated successfully",
      data: updatedUser,
    });
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
      status: "success",
      error: false,
      message: "User deleted successfully",
      data: null,
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
      status: "success",
      error: false,
      message: "User fetched successfully",
      data: user,
    });
  }
);

// Get all users
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    error: false,
    message: "Users fetched successfully",
    totalUsers: users.length,
    data: users,
  });
});

export { register, updateUser, deleteUser, getUserById, getAllUsers, login };
