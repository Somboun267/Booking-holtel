import * as MaintenanceService from"../service/MaintenanceProfile.service.js"
import { HttpStatus } from "../utils/httpStatus.js"
import { successResponse,sendError } from "../utils/responeData.js"
import type { Request,Response } from "express"


export const getMaintenance = async(req:Request, res:Response)=>{
    try{
        const maintenance = await MaintenanceService.getMaintenance()
        return successResponse(res,{
            status:HttpStatus.OK,
            message:"get maintenance successFully",
            data:maintenance
        })

    }catch(err){
        console.log(err)
        return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message: err instanceof Error ? err.message: "failed to get maintenance"
        })
    }
}

export const createMaintenance = async(req:Request,res:Response)=>{
    try{
        const {userId,specialty} = req.body
        const maintenance = await MaintenanceService.createMaintenance({
            userId,
            specialty
        })
        return successResponse(res,{
            status:HttpStatus.CREATED,
            message:"create maintenance successFully",
            data:maintenance
        
        })

    }catch(err){
        console.log(err)
        return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message: err instanceof Error ? err.message: "failed to create maintenance"
        })
    }
}

export const updateMaintenance = async (req: Request,res: Response) => {
    try {
        const { id } = req.params;
        const { specialty } = req.body;
        const result = await MaintenanceService.updatemaintenance(
            Number(id),
            {
                specialty
            }
        );
        return successResponse(res, {
            status: HttpStatus.OK,
            message: "update maintenance successfully",
            data: result
        });

    } catch (err) {
        console.log(err);

        return sendError(res, {
            status: HttpStatus.BAD_REQUEST,
            message: err instanceof Error
                ? err.message
                : "failed to update maintenance"
        });
    }
};