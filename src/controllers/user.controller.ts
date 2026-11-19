import * as userService from "../service/user.service.js"
import type { Request,Response } from "express"
import { HttpStatus } from "../utils/httpStatus.js"
import { successResponse,sendError } from "../utils/responeData.js"



export const getUser = async(req:Request, res: Response)=>{
    try{
        const user = await userService.getAlluser()

        return successResponse(res,{
            status:HttpStatus.OK,
            message:"get user successFully",
            data:user
        })

    }catch(err){
        console.log(err)
        return sendError (res,{
            status:HttpStatus.INTERNAL_SERVER_ERROR,
            message:err instanceof Error ? err.message : "failed to get user"
        })
    }
}

export const getByID = async(req:Request, res:Response) =>{
    try{
        const {id} = req.params
        const user = await userService.getbyId(Number(id))
        return successResponse(res,{
            status:HttpStatus.OK,
            message:"get to user by id successFully",
            data:user
        })

    }catch(err){
        console.log(err)
        return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message:err instanceof Error ? err.message: "failed to get user by id"
        })
    }
}

export const createUser = async(req:Request, res:Response)=>{
    try{
        const {username, password,fullName,email,phone,roleId} = req.body
        const user = await userService.createUser({
            username,
            password,
            fullName,
            email,
            phone,
            roleId
        });
        return successResponse(res,{
            status:HttpStatus.CREATED,
            message:"create user successFully",
            data:user
        })
    }catch(err){
        console.log(err)
        return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message:err instanceof Error ? err.message: "failed to create user"
        })
    }
}


export const login = async(req:Request, res:Response)=>{
    try{
         const {username,password} = req.body
         const result = await userService.login({
            username,
            password
        });

        return successResponse(res,{
            status:HttpStatus.OK,
            message:"login successFully",
            data:result
        })
    } catch(err){
          console.log(err)
          return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message:err instanceof Error ? err.message: "failed to login user"
          })
    }
}

export const updateUser = async(req:Request, res:Response)=>{
    try{
        const {id} = req.params
        const data = req.body

        const NewData = await userService.updateUser( Number(id),data)

        return successResponse(res,{
            status:HttpStatus.OK,
            message:"update user successFully",
            data:NewData
        })

    }catch(err){
        console.log(err)
        return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message:err instanceof Error ? err.message: "failed to update user"
        })
    }
}