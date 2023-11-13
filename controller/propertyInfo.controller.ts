import { NextFunction, Response } from "express";
import { AppError } from '../utils/appError'
import { Request, catchAsync } from "../utils/catchAsync";
import { PropertyInfo } from '../model/property.info.model';

const createpropertyInfo = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { property_name, property_email, property_contact, star_ratings, property_code } = req.body;

        if (!req.body) {
            next(new AppError("Please fill all the required fields", 400));
        }

        const property = await PropertyInfo.find({
            property_email,
          });
      
          if (property.length) {
            next(new AppError("An user is already exits with this email", 400));
          }

        const newPropertyInfo = await PropertyInfo.create({
            property_name,
            property_email,
            property_contact,
            star_ratings,
            property_code
        });
        const totalProperty = await PropertyInfo.find();


        res.status(201).json({
            status: "success",
            error: false,
            total_property:totalProperty.length,
            message: "Property registered successfully",
            data: newPropertyInfo,
        });

    });

export {createpropertyInfo};