import type { Request,Response } from "express";
import { HttpStatus } from "../utils/httpStatus.js";
import { successResponse,sendError } from "../utils/responeData.js";
import * as roomImageService from "../service/roomImage.service.js"


export const getAll = async (req:Request,res:Response)=>{
    try{
        const result = await roomImageService.getRoomImages()
        return successResponse(res,{
            status:HttpStatus.OK,
            message:"get image room successfully",
            data:result
        })

    }catch(err){
        console.log(err)
        return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message: err instanceof Error ? err.message:"failed to get image room"
        })
    }
}

export const createRoomImages = async(req:Request,res:Response)=>{
    try{
        const roomId = Number(req.params.roomId);

        const files = req.files as Express.Multer.File[];
       
        const result = await roomImageService.createRoomImages({
            roomId,
            files
        });
        return successResponse(res,{
            status:HttpStatus.CREATED,
            message:"create room images successfully",
            data:result
        })


    }catch(err){
        console.log(err)
        return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message:err instanceof Error ? err.message:"failed to create room image"
        })
    }
}

export const deleteRoomImage = async (req: Request, res: Response) => {
    try {
        const {id} = req.params

      

        const result = await roomImageService.deleteRoomImage(Number(id));

        return successResponse(res, {
            status: HttpStatus.OK,
            message: "delete room image successfully",
            
        });

    } catch (err) {
        console.log(err);
        return sendError(res, {
            status: HttpStatus.BAD_REQUEST,
            message:  err instanceof Error  ? err.message: "failed to delete room image"
                       
        });
    }
};