import * as customerService from "../service/customer.service.js";
import { HttpStatus } from "../utils/httpStatus.js";
import type { Request, Response } from "express";
import { successResponse, sendError } from "../utils/responeData.js";


export const getall = async (req: Request, res: Response) => {
  try {
    const customer = await customerService.getall();
    return successResponse(res, {
      status: HttpStatus.OK,
      message: "get customer successfully",
      data: customer,
    });
  } catch (err) {
    console.log(err);
    return sendError(res, {
      status: HttpStatus.BAD_REQUEST,
      message: err instanceof Error ? err.message : "failed to get customer",
    });
  }
};

export const getbyId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const customer = await customerService.getById(Number(id));
    return successResponse(res, {
      status: HttpStatus.OK,
      message: "get customer by id successfully",
      data: customer,
    });
  } catch (err) {
    console.log(err);
    return sendError(res, {
      status: HttpStatus.BAD_REQUEST,
      message:
        err instanceof Error ? err.message : "failed to get customer by id",
    });
  }
};

export const getbyname = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const customer = await customerService.getName(String(name));
    return successResponse(res, {
      status: HttpStatus.OK,
      message: "get customer by name successfully",
      data: customer,
    });
  } catch (err) {
    console.log(err);
    return sendError(res, {
      status: HttpStatus.BAD_REQUEST,
      message:
        err instanceof Error ? err.message : "failed to get customer by name",
    });
  }
};

export const createCusomer = async (req: Request, res: Response) => {
  try {
    const {
      username,
      password,
      fullName,
      email,
      phone,
      idCardNumber,
      nationality,
      address,
    } = req.body;
    const customer = await customerService.create({
      username,
      password,
      fullName,
      email,
      phone,
      idCardNumber,
      nationality,
      address,
    });
    return successResponse(res, {
      status: HttpStatus.CREATED,
      message: "create customer successfully",
      data: customer,
    });
  } catch (err) {
    console.log(err);
    return sendError(res, {
      status: HttpStatus.BAD_REQUEST,
      message: err instanceof Error ? err.message : "failed to create customer",
    });
  }
};

export const loginCustomer = async (req: Request, res: Response) => {
  try {
    const {username, password} = req.body
    const login = await customerService.login({
        username,
        password
    })
    return successResponse(res,{
        status:HttpStatus.OK,
        message:"login successfully",
        data:login
    })

  } catch (err) {
    console.log(err);
    return sendError(res,{
        status:HttpStatus.BAD_REQUEST,
        message: err instanceof Error ? err.message: " failed to login"
    })
  }
};

export const updateCustomer = async(req:Request, res:Response)=>{
    try{
        const {id} = req.params
        const data = req.body
        const customerUpdate = await customerService.update(
            Number(id),
            data
        )

        return successResponse(res,{
            status:HttpStatus.OK,
            message: "update customer successfully",
            data:customerUpdate
        })
   

    }catch(err){
        console.log(err)
        return sendError(res,{
            status:HttpStatus.BAD_REQUEST,
            message: err instanceof Error ? err.message: "failed to update customer" 
        })
    }
}