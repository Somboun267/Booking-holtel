import * as paymentService from "../service/payment.service.js"
import { HttpStatus } from "../utils/httpStatus.js"
import type { Request,Response } from "express"
import { successResponse,sendError } from "../utils/responeData.js"

export const getPayment = async(req:Request, res:Response)=>{
    try{
        const payment = await paymentService.getPayment()
        return successResponse(res,{
            status:HttpStatus.OK,
            message:"get payment successfully",
            data:payment
        })

    }catch(err){
        console.log(err)
        return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message:err instanceof Error ? err.message:"failed to get payment"
        })
    }
}

export const createPayment = async(req:Request, res:Response)=>{
    try{
        const {bookingId,amount,paymentMethod} = req.body
        const payment = await paymentService.createPayment({
            bookingId,
            amount,
            paymentMethod
        })
        return successResponse(res,{
            status:HttpStatus.CREATED,
            message:"create payment successfully",
            data:payment
        })

    }catch(err){
        console.log(err)
        return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message:err instanceof Error ? err.message:"failed to create payment"

        })
    }
}

export const updatePayment = async(req:Request,res:Response)=>{
    try{
        const {id} = req.params
        const data= req.body
        const payment = await paymentService.updatePayment(Number(id),data)
        return successResponse(res,{
            status:HttpStatus.OK,
            message:"update payment successfully",
            data:payment
        })

    }catch(err){
        console.log(err)
        return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message:err instanceof Error ? err.message:"failed to update payment"
        })
    }
}