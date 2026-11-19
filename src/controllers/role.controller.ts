
import * as roleService from "../service/role.service.js";
import { HttpStatus } from "../utils/httpStatus.js";
import { successResponse, sendError } from "../utils/responeData.js";
import type { Request, Response } from "express";

export const getAll = async (req: Request, res: Response) => {
  try {
    const getAll = await roleService.getAll();

    return successResponse(res, {
      status: HttpStatus.OK,
      message: "get role SuccessFully",
      data: getAll,
    });
  } catch (err) {
    console.log(err);
    return sendError(res, {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: err instanceof Error ? err.message : "failed to get role",
    });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const get = await roleService.getById(Number(id));

    return successResponse(res, {
      status: HttpStatus.OK,
      message: "get role SuccessFully",
      data: get,
    });
  } catch (err) {
    console.log(err);
    return sendError(res, {
      status: HttpStatus.BAD_REQUEST,
      message: err instanceof Error ? err.message : "failed to get role",
    });
  }
};

export const getByname = async(req:Request, res:Response)=>{
    try{
        const {name} = req.params
        const getName  = await roleService.getByName(String(name))
        return successResponse(res,{
            status:HttpStatus.OK,
            message:"get role SuccessFully",
            data:getName
        })
    }catch(err){
        console.log(err)
        return sendError(res,{
            status: HttpStatus.BAD_REQUEST,
            message: err instanceof Error ? err.message: "failed to get role"
        })
    }
}

export const createRole = async(req:Request, res:Response)=>{
    try{
         const {roleName,description} = req.body
         const crete = await roleService.createRole({
            roleName,
            description

         })
         return successResponse(res,{
            status:HttpStatus.CREATED,
            message:"create role SuccessFully",
            data:crete
         })

    }catch(err){
        console.log(err)
        return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message: err instanceof Error ? err.message : "failed to create role"
        })
    }
}

export const updateRole = async(req:Request, res:Response)=>{
    try{
        const {id} = req.params
        const data =req.body
        const update = await roleService.updateRole(Number(id),data)

        return successResponse(res,{
            status:HttpStatus.OK,
            message:"update role SuccessFully",
            data:update
        })

    }catch(err){
        console.log(err)
        return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message: err instanceof Error ? err.message : "failed to update role"
            
        })
    }
}

export const remove = async(req:Request, res:Response)=>{
    try{
        const {id} = req.params
        const remove = await roleService.remove(Number(id))

        return successResponse(res,{
            status:HttpStatus.OK,
            message:"delete role SuccessFully",
            data:remove
        })

    }catch(err){
        console.log(err)
        return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message: err instanceof Error ? err.message : "failed to delete role"
        })
    }
}