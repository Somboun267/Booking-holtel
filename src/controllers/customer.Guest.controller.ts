import * as customerGuestService from "../service/customer.Guest.service.js"
import { HttpStatus } from "../utils/httpStatus.js"
import type { Request, Response } from "express"
import { successResponse,sendError } from "../utils/responeData.js"



export const createCustomerGuest = async(req:Request,res:Response)=>{
    try{
        const {fullName, phone, idCardNumber,nationality,address} = req.body
        const createCustomer = await customerGuestService.createGuest({
            fullName,
            phone,
            idCardNumber,
            nationality,
            address
        })
        return successResponse(res,{
            status:HttpStatus.CREATED,
            message:"create customerGuest success fully",
             data:createCustomer
        })
      
    }catch(err){
        console.log(err)
        return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message: err instanceof Error ? err.message: "failed to create customerGuest"
        })
    }
}

export const getCustomerGuest = async(req:Request, res:Response)=>{
    try{
        const customerGuest = await customerGuestService.getCustomerGuest();
        return successResponse(res,{
            status:HttpStatus.OK,
            message:"get customerGuest successfully",
            data:customerGuest
        })

    }catch(err){
        return sendError(res,{
            status:HttpStatus.OK,
            message:err instanceof Error ? err.message:"failed to get customerGuest "
        })
    }
}