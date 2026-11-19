import * as MaintenanceRequestService from "../service/MaintenanceRequest.service.js"
import type { Request,Response } from "express"
import { HttpStatus } from "../utils/httpStatus.js"
import { successResponse,sendError } from "../utils/responeData.js"



export const getAll = async(req:Request,res:Response)=>{
    try{
        const maintenance = await MaintenanceRequestService.getAll()
        return successResponse(res,{
            status:HttpStatus.OK,
            message:"get maintenance request successfully",
            data:maintenance
        })

    }catch(err){
        console.log(err)
        return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message: err instanceof Error ? err.message:"failed to get maintenance request"
        })
    }
}

export const create = async(req:Request, res:Response)=>{
    try{
        const {roomId,reportedById,issueDescription} = req.body
        const maintenanceRequest = await MaintenanceRequestService.createMaintenance(
            roomId,
            reportedById,
            issueDescription
        )
        
        return successResponse(res,{
            status:HttpStatus.CREATED,
            message:"create maintenance request successfully",
            data:maintenanceRequest
        })

    }catch(err){
        console.log(err)
        return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message: err instanceof Error ? err.message:"failed to create maintenance request"
        })
    }
}

export const updateMaintenanceRequest = async(req:Request,res:Response)=>{
    try{
        const {id} = req.params
        const data = req.body
        const update = await MaintenanceRequestService.updateMaintenanceRequest(Number(id),data)

        return successResponse(res,{
            status:HttpStatus.OK,
            message:"update maintenance request successfully",
            data:update
        })

    }catch(err){
        console.log(err)
        return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message: err instanceof Error ? err.message:"failed to update maintenance request"
        })
    }
}