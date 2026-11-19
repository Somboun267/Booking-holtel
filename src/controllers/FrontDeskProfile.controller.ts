import * as FrontDeskService from "../service/FrontDeskProfile.service.js"
import { HttpStatus } from "../utils/httpStatus.js"
import type { Request,Response } from "express"
import { successResponse,sendError } from "../utils/responeData.js"




export const getall = async(req:Request, res:Response)=>{
    try{
         const get = await FrontDeskService.getAll();
         return successResponse(res,{
            status:HttpStatus.OK,
            message:"get frontdesk profile successFully",
            data:get
         })
    }catch(err){
        console.log(err)
        return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message: err instanceof Error ? err.message: "failed to get frontdesk profile"
        })
    }
}

export const crateFront = async(req:Request,res:Response)=>{
    try{
        const {userId,shift} = req.body
        const frontdesk = await FrontDeskService.createFrontdesk({
            userId,
            shift
        })
        return successResponse(res,{
            status:HttpStatus.CREATED,
            message:"create frontdesk successFully",
            data:frontdesk
        })

    }catch(err){
        console.log(err)
        return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message: err instanceof Error ? err.message: "failed to create frontdesk profile"
        })
    }
}