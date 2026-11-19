import { HttpStatus } from "../utils/httpStatus.js";
import { successResponse,sendError } from "../utils/responeData.js";
import * as roomAmenityService from "../service/roomAmenity.service.js"
import type { Request,Response } from "express";



export const getAll = async(req:Request,res:Response)=>{
    try{
        const roomAmenity = await roomAmenityService.getAmenityRoom()
        return successResponse(res,{
            status:HttpStatus.OK,
            message:"get room amenity successfully",
            data:roomAmenity
        })

    }catch(err){
        console.log(err)
        return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message: err instanceof Error ? err.message:"failed to get room amenity"
        })
    }
}

export const getid = async(req:Request,res:Response)=>{
    try{
        const {id} = req.params
        const room = await roomAmenityService.getID(Number(id))
        return successResponse(res,{
            status:HttpStatus.OK,
            message:"get room amenity by id successfully",
            data:room
        })

    }catch(err){
        console.log(err)
        return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message:err instanceof Error ? err.message:"faiel to get room amenity by id"
        })
    }
}

export const createAmenityRooms = async(req:Request,res:Response)=>{
    try{
        const {roomId,amenityId} = req.body
        const room = await roomAmenityService.createAmenityRooms({
            roomId,
            amenityId
        })
        return successResponse(res,{
            status:HttpStatus.CREATED,
            message:"create room amenity successfully",
            data:room
        })

    }catch(err){
        console.log(err)
        return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message: err instanceof Error ? err.message:"failed to create room amenity"
        })
    }
}