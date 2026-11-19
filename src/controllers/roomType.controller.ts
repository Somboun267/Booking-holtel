import * as roomTypeService from "../service/roomType.service.js";
import { HttpStatus } from "../utils/httpStatus.js";
import type { Request, Response } from "express";
import { successResponse, sendError } from "../utils/responeData.js";

export const get = async (req: Request, res: Response) => {
  try {
    const roomtype = await roomTypeService.get();
    return successResponse(res, {
      status: HttpStatus.OK,
      message: "get room type successfully",
      data: roomtype,
    });
  } catch (err) {
    console.log(err);
    return sendError(res, {
      status: HttpStatus.BAD_REQUEST,
      message: err instanceof Error ? err.message : "failed to get room type",
    });
  }
};

export const createRoomType = async (req: Request, res: Response) => {
  try {
    const { typeName, basePrice, capacity, description } = req.body;
    const roomType = await roomTypeService.createRoomtype({
      typeName,
      basePrice,
      capacity,
      description,
    });
    return successResponse(res, {
      status: HttpStatus.CREATED,
      message: "create room type successfully",
      data: roomType,
    });
  } catch (err) {
    console.log(err);
    return sendError(res, {
      status: HttpStatus.BAD_REQUEST,
      message: err instanceof Error ? err.message : "failed to creae room type",
    });
  }
};

export const updateRoomType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const roomtype = await roomTypeService.roomTypeUpdate(Number(id), data);
    return successResponse(res, {
      status: HttpStatus.OK,
      message:"update room type successfully",
      data:roomtype
    });
  } catch (err) {
    console.log(err);
    return sendError(res, {
      status: HttpStatus.BAD_REQUEST,
      message:
        err instanceof Error ? err.message : "faield to update room type",
    });
  }
};
