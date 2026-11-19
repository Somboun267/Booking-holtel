import type { Request,Response } from "express";
import * as bookingService from "../service/booking.service.js"
import { successResponse,sendError } from "../utils/responeData.js";
import { HttpStatus } from "../utils/httpStatus.js";



 export const getbook = async(req:Request, res:Response)=>{
     try{
        const booking = await bookingService.getbooking()
        return successResponse(res,{
            status:HttpStatus.OK,
            message:"get booking successfully",
            data:booking
        })

     }catch(err){
        console.log
        return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message: err instanceof Error ? err.message:"failed to get booking"

        })
     }
}

export const createBooking = async (req: Request, res: Response) => {
    try {
        const {
            customerId,
            roomId,
            checkInDate,
            checkOutDate,
            numGuests,
            bookingSource,
            createdById
        } = req.body;

        const booking = await bookingService.createBooking({
            customerId,
            roomId,
            checkInDate: new Date(checkInDate),
            checkOutDate: new Date(checkOutDate),
            numGuests,
            bookingSource,
            createdById
        });

        return successResponse(res, {
            status: HttpStatus.CREATED,
            message: "create booking successfully",
            data: booking
        });

    } catch (err) {
        console.log(err);

        return sendError(res, {
            status: HttpStatus.BAD_REQUEST,
            message: err instanceof Error
                ? err.message
                : "failed to create booking"
        });
    }
};
export const updateBooking = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const {checkInDate,checkOutDate, actualCheckIn,actualCheckOut, numGuests, bookingStatus, bookingSource} = req.body;
        const booking = await bookingService.updateBooking(id, {
            checkInDate,
            checkOutDate,
            actualCheckIn,
            actualCheckOut,
            numGuests,
            bookingStatus,
            bookingSource
        });

        return successResponse(res, {
            status: HttpStatus.OK,
            message: "update booking successfully",
            data: booking
        });

    } catch (err) {
        console.log(err);

        return sendError(res, {
            status: HttpStatus.BAD_REQUEST,
            message: err instanceof Error
                ? err.message
                : "failed to update booking"
        });
    }
};