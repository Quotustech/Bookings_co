import { NextFunction, Response } from "express";
import { Request, catchAsync } from "../utils/catchAsync";
import Query from '../model/query.model';
import User from '../model/user.model';
import axios from 'axios';
import 'dotenv/config'
import { AppError } from "../utils/appError";


const apiKey = process.env.OPENAI_API_KEY
const url = process.env.CHAT_GPT_URL || ''
const gptModel = process.env.FINETUNE_MODEL




const queryHandler = catchAsync (
    async (req: Request, res: Response, next: NextFunction) => {
        const { userId, query } = req.body;


    if (!req.body) {
      return next(new AppError("Please fill all the required fields", 400));
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const response = await axios.post(
        url,
        {
            model: gptModel,
            messages: [
              {
                role: "system",
                content: "You are a helpful assistant.",
              },
              {
                role: "user",
                content: query,
              },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
          }
    );

    const newQuery = new Query({
        user: userId,
        question: query,
        answer: response.data.choices[0].message.content,
      });
      await newQuery.save();
      return res.json({
        question: query,
        response: response.data.choices[0].message.content,
      });

    }

);

export { queryHandler };




