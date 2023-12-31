import { NextFunction, Response } from "express";
import { AppError } from '../utils/appError'
import { Request, catchAsync } from "../utils/catchAsync";
import { PropertyInfo } from '../model/property.info.model';
import { decodeToken } from "../utils/jwtHelper";

const createpropertyInfo = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const {user_Id, property_name, property_email, property_contact, star_ratings, property_code, image, description } = req.body;
        console.log("role",req.role)
        if (!req.body) {
            next(new AppError("Please fill all the required fields", 400));
        }

        const property = await PropertyInfo.find({
            property_email,
          });
      
          if (property.length) {
            next(new AppError("An user is already exits with this email", 400));
          }

          if (req.role !== 'PROPERTY_MANAGER') {
            return next(new AppError("You do not allowed to perform this  action", 400));
        }

        const newPropertyInfo = await PropertyInfo.create({
            user_Id,
            property_name,
            property_email,
            property_contact,
            star_ratings,
            property_code,
            image, 
            description
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


const updatePropertyInfo = catchAsync(
    async( req: Request, res: Response, next: NextFunction)=>{
        const propertInfoId = req.params.id;

        const {property_name, property_email, property_contact, star_ratings, property_code, image, description} = req.body;

        const property = await PropertyInfo.findById(propertInfoId);

    if (!property) {
      return next(new AppError(`No property found with this id ${propertInfoId}`, 404));
    }

    const updateProperty = await PropertyInfo.findByIdAndUpdate(
        propertInfoId,
        {property_name, property_email, property_contact, star_ratings, property_code, image, description},
        {new: true}
    );
    return res.status(200).json({
        status: "success",
        error: false,
        message: "Property updated successfully",
        data: updateProperty,
      });

    }
);

const deleteProperty = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const propertyInfoId = req.params.id;
  
      const property = await PropertyInfo.findById(propertyInfoId);
  
      if (!property) {
        return next(new AppError(`No property found with this id ${property}`, 404));
      }
  
      await PropertyInfo.findByIdAndDelete(propertyInfoId);
  
      res.status(200).json({
        status: "success",
        error: false,
        message: "Property deleted successfully",
        data: null,
      });
    }
  );


  const getPropertyInfoById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const propertyId = req.params.id;
        const property = await PropertyInfo.findById(propertyId);
    
        if (!property) {
          return next(new AppError(`No property found with this id ${propertyId}`, 404));
        }
    
        res.status(200).json({
          status: "success",
          error: false,
          message: "Property fetched successfully",
          data: property,
        });
      })

      const getAllProperty = catchAsync(async (req: Request, res: Response) => {

        const token = req.headers.authorization?.split("Bearer ")[1];

        const deToken = await decodeToken(token as any,process.env.JWT_SECRET_KEY as any)

        const properties = await PropertyInfo.find({ user_Id: deToken.id });

        res.status(200).json({
          status: "success",
          error: false,
          message: "Property fetched successfully",
          totalProperty: properties.length,
          data: properties,
        });
      });

export {createpropertyInfo,updatePropertyInfo,deleteProperty,getPropertyInfoById,getAllProperty};