import prisma from "../config/prisma.js";

interface createRoomTypeInput{
    typeName:string
    basePrice:number
    capacity:number
    description?:string
}

interface updateRoomTypeInput {
    typeName?:string
    basePrice?:number
    capacity?:number
    description?:string
}

export const get = async()=>{
    return await prisma.roomType.findMany()
}

export const createRoomtype = async(data:createRoomTypeInput)=>{
    if(!data.typeName){
        throw new Error("typName is required")
    }
    if(!data.basePrice){
        throw new Error("basePrice is required")
    }
    const roomType = await prisma.roomType.create({
        data:{
            typeName:data.typeName,
            basePrice:data.basePrice,
            capacity:data.capacity,
            description:data.description

        }
    })
    return roomType
}

export const roomTypeUpdate = async(id:number, data:updateRoomTypeInput)=>{
    
    const getId = await prisma.roomType.findUnique({
        where:{
            roomTypeId:id,
        }
    })
    if(!getId){
        throw new Error("roomType not found")
    }
    const update = await prisma.roomType.update({
        where: {
            roomTypeId: id,
        },
        data,
    })
    return update
}