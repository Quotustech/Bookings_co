import { NextFunction, Response } from "express";
import { AppError } from '../utils/appError'
import { Request, catchAsync } from "../utils/catchAsync";
import { PropertyAminite } from '../model/property.aminites.model';
import { PropertyInfo } from '../model/property.info.model';


const createPropertyAminite = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const { propertyInfo,
            destination_type,
            property_type,
            no_of_rooms_available,
            wifi,
            swimming_pool,
            fitness_center,
            spa_and_wellness,
            restaurant,
            room_service,
            bar_and_lounge,
            parking,
            concierge_services,
            pet_friendly,
            business_facilities,
            laundry_services,
            child_friendly_facilities} = req.body;

            if (!req.body) {
                next(new AppError("Please fill all the required fields", 400));
            }


            const newPropertyAminite = await PropertyAminite.create({
                propertyInfo,
                destination_type,
                property_type,
                no_of_rooms_available,
                wifi,
                swimming_pool,
                fitness_center,
                spa_and_wellness,
                restaurant,
                room_service,
                bar_and_lounge,
                parking,
                concierge_services,
                pet_friendly,
                business_facilities,
                laundry_services,
                child_friendly_facilities
            });

            await PropertyInfo.findByIdAndUpdate(propertyInfo, { property_aminite: newPropertyAminite._id });


            res.status(201).json({
                status: "success",
                error: false,
                message: "Property Aminites added successfully",
                data: newPropertyAminite,
            });
        }

);

const getPropertyAminiteById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const propertyId = req.params.id;
        const property = await PropertyAminite.findById(propertyId);
    
        if (!property) {
          return next(new AppError(`No property found with this id ${propertyId}`, 404));
        }
    
        res.status(200).json({
          status: "success",
          error: false,
          message: "Property aminite fetched successfully",
          data: property,
        });
      })
export {createPropertyAminite, getPropertyAminiteById};