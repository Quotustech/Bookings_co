import { NextFunction, Response } from "express";
import { AppError } from '../utils/appError'
import { Request, catchAsync } from "../utils/catchAsync";
import { PropertyAddress } from '../model/property.address.model';
import { PropertyInfo } from '../model/property.info.model';


const createPropertyAddress = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const { propertyInfo,
            address_line_1,
            address_line_2,
            country,
            state,
            city,
            location,
            neighbour_area } = req.body;

            if (!req.body) {
                next(new AppError("Please fill all the required fields", 400));
            }

            const newPropertyAddress = await PropertyAddress.create({
                propertyInfo,
                address_line_1,
                address_line_2,
                country,
                state,
                city,
                location,
                neighbour_area
            });

            await PropertyInfo.findByIdAndUpdate(propertyInfo, { property_address: newPropertyAddress._id });
            const address = await PropertyAddress.find({propertyInfo:propertyInfo});


            res.status(201).json({
                status: "success",
                error: false,
                total_address : address.length,
                message: "Property Address registered successfully",
                data: newPropertyAddress,
            });
        }

);

export {createPropertyAddress};