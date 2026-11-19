import * as amenityService from "../service/Amenity.service.js"
import { HttpStatus } from "../utils/httpStatus.js"
import type { Request,Response } from "express"
import {successResponse,sendError} from "../utils/responeData.js"




export const getAmenity = async(req:Request, res:Response)=>{
    try{
        const amenity = await amenityService.getAmenity()
        return successResponse(res,{
            status:HttpStatus.OK,
            message:"get amenity successfully",
            data:amenity
        })

    }catch(err){
        console.log(err)
        return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message:err instanceof Error ? err.message:"failed to get amenity"

        })
    }
}

 export const createAmenity = async(req:Request,res:Response)=>{
    try{
        const {amenityName} = req.body
        const amenity = await amenityService.createAmenity({
            amenityName
        })

        return successResponse(res,{
            status:HttpStatus.CREATED,
            message:"create amenity successfully",
            data:amenity
        })
 
    }catch(err){
        console.log(err)
        return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message:err instanceof Error ? err.message:"failed to create amenity"
        })
    }
 }