
import prisma from "../config/prisma.js"
import * as HousekeepingService from"../service/HousekeepingProfile.service.js"
import { HttpStatus } from "../utils/httpStatus.js"
import { successResponse,sendError } from "../utils/responeData.js"
import type { Request,Response } from "express"



export const getHousekeeping = async(req:Request, res:Response)=>{
    try{
        const hosuekeeping = await HousekeepingService.getHousekeeping()

        return successResponse(res,{
            status:HttpStatus.OK,
            message:"get to housekeeping successFully",
            data:hosuekeeping
        })
    }catch(err){
        console.log(err)
        return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message: err instanceof Error ? err.message: "failed to get housekeeping"
        })
    }
}

export const createHousekeeping = async(req:Request, res:Response)=>{
    try{
        const {userId,zoneResponsible} = req.body
        const house = await HousekeepingService.createHousekepeping({
            userId,
            zoneResponsible
        })
        return successResponse(res,{
            status:HttpStatus.CREATED,
            message:"crate housekeeping successFully",
            data:house
        })

    }catch(err){
        console.log(err);
        return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message: err instanceof Error ? err.message: "failed to create housekeeping"
        })
    }
}