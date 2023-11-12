import { NextFunction, Response } from "express";
import Hotel from '../model/hotel.model'
import {AppError} from '../utils/appError'
import {Request, catchAsync } from "../utils/catchAsync";




const getAllHotels = catchAsync(async (req: Request, res: Response) => {
    const hotels = await Hotel.find();
    res.status(200).json({
      status: "success",
      error: false,
      message: "Hotel fetched successfully",
      totalHotels: hotels.length,
      data: hotels,
    });
  });


const getAllHotelBySearch =catchAsync(async (req: Request, res: Response)=>{
    try{
        const { hotel_name, state, district, location, hotel_type } = req.query;

        const query: any = {};

        if (hotel_name) query.hotel_name = new RegExp(hotel_name as string, 'i');
        if (state) query.state = new RegExp(state as string, 'i');
        if (district) query.district = new RegExp(district as string, 'i');
        if (location) query.location = new RegExp(location as string, 'i');
        if (hotel_type) query.hotel_type = new RegExp(location as string, 'i');

        const hotels = await Hotel.find(query);
        res.json(hotels);

    }
    catch (error) {
        console.error('Error fetching hotels:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

const getHotelById = catchAsync(async (req: Request, res: Response, next: NextFunction)=>{

    const hotelId = req.params.id;
    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
        return next(new AppError(`No user found with this id ${hotelId}`, 404));
      }

      res.status(200).json({
        status: "success",
        error: false,
        message: "hotel fetched successfully",
        data: hotel,
      });
})

  export  {getAllHotels, getAllHotelBySearch, getHotelById};


