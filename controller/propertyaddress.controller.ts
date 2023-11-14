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
            neighbour_area,
            zip_code
           } = req.body;

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
                neighbour_area,
                zip_code
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

const updatePropertyAddress = catchAsync(
    async( req: Request, res: Response, next: NextFunction)=>{
        const propertAddressId = req.params.id;

        const {address_line_1,
            address_line_2,
            country,
            state,
            city,
            location,
            neighbour_area,
            zip_code
          } = req.body;

        const propertyAddress = await PropertyAddress.findById(propertAddressId);

    if (!propertyAddress) {
      return next(new AppError(`No property found with this id ${propertAddressId}`, 404));
    }

    const updatePropertyAddress = await PropertyAddress.findByIdAndUpdate(
        propertAddressId,
        {address_line_1,
            address_line_2,
            country,
            state,
            city,
            location,
            neighbour_area,
            zip_code
          },
        {new: true}
    );
    return res.status(200).json({
        status: "success",
        error: false,
        message: "Property addreaa updated successfully",
        data: updatePropertyAddress,
      });

    }
);

const deletePropertyAddress = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const propertyAddressId = req.params.id;
  
      const propertyAddress = await PropertyAddress.findById(propertyAddressId);
  
      if (!propertyAddress) {
        return next(new AppError(`No property address found with this id ${propertyAddressId}`, 404));
      }
  
      await PropertyAddress.findByIdAndDelete(propertyAddressId);
  
      res.status(200).json({
        status: "success",
        error: false,
        message: "Property address deleted successfully",
        data: null,
      });
    }
  );


  const getPropertyAddressById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const propertyId = req.params.id;
        const property = await PropertyAddress.findById(propertyId);
    
        if (!property) {
          return next(new AppError(`No property found with this id ${propertyId}`, 404));
        }
    
        res.status(200).json({
          status: "success",
          error: false,
          message: "Property address fetched successfully",
          data: property,
        });
      })

      

export {createPropertyAddress, updatePropertyAddress, deletePropertyAddress, getPropertyAddressById};