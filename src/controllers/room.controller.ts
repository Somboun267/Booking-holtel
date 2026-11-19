import * as roomService from "../service/room.service.js"
import { HttpStatus } from "../utils/httpStatus.js"
import type { Request,Response } from "express"
import { successResponse,sendError } from "../utils/responeData.js"
import { stat } from 'node:fs';


export const getAll = async(req:Request, res:Response)=>{
    try{
        const room = await roomService.getRoom();
        return successResponse(res,{
            status:HttpStatus.OK,
            message:"get room successfully",
            data:room
        })
    }catch(err){
        console.log(err)
        return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message:err instanceof Error ? err.message:"failed to get room"
        })
    }
}

export const getById = async(req:Request,res:Response)=>{
    try{
        const {id} = req.params
        const room = await roomService.getById(Number(id))
        return successResponse(res,{
            status: HttpStatus.OK,
            message:"get room by id successfully",
            data:room
        })

    }catch(err){
        console.log(err)
        return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message:err instanceof Error ? err.message:"failed to get room ny id"
        })
    }
}

export const createRoom = async(req:Request, res:Response)=>{
    try{
        const {roomNumber, floor, roomTypeId} = req.body
        const room = await roomService.createRoom({
            roomNumber,
            floor,
            roomTypeId
        })
        return successResponse(res,{
            status:HttpStatus.CREATED,
            message:"create room successfully",
            data:room
        })

    }catch(err){
        console.log(err)
        return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message: err instanceof Error ? err.message:"failed to cretae room"
        })
    }
}

export const updateRoom = async(req:Request, res:Response)=>{
    try{
        const {id} = req.params
        const data = req.body

        const roomUpdate = await roomService.updateRoom(Number(id),data)
        return successResponse(res,{
            status:HttpStatus.OK,
            message:"update room successfully",
            data:roomUpdate
        })

    }catch(err){
        console.log(err)
        return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message: err instanceof Error ? err.message:"faile to update room"
        })
    }
}