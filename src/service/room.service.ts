import prisma from "../config/prisma.js";


interface createRoom {
    roomNumber:string
    floor:number
    roomTypeId:number

}
interface updateRoom {
    roomNumber?:string
    floor?:number
    roomTypeId?:number

}
export const getRoom = async () => {
    return await prisma.room.findMany({
        include: {
            roomType: true,

            roomAmenities: {
                include: {
                    amenity: {
                        select: {
                            amenityId: true,
                            amenityName: true
                        }
                    }
                }
            },
            roomImages: true
        }
    });
};
export const getById = async (id: number) => {
    const room = await prisma.room.findUnique({
        where: {
            roomId: id
        }
    });

    if (!room) {
        throw new Error("Room not found");
    }
    return room;
};

export const createRoom = async(data:createRoom)=>{
  
    if(!data.roomNumber){
        throw new Error("roomNumber is required")
    }
    if(!data.floor){
        throw new Error("floor is required")
    }
    if(!data.roomTypeId){
        throw new Error("room type id is required")
    }
    const checkNumber = await prisma.room.findUnique({
        where: {
            roomNumber: data.roomNumber
        }
    });

    if (checkNumber) {
        throw new Error("Room number already exists");
    }
   

    const room = await prisma.room.create({
        data:{
            roomNumber:data.roomNumber,
            floor:data.floor,
            roomTypeId:data.roomTypeId

        }
    })
    return room;
}

export const updateRoom = async(id:number, data:updateRoom)=>{
    const roomNumber = await prisma.room.findUnique({
        where:{
            roomId: id
        }
        
    })
    if(!roomNumber){
        throw new Error("room id not found")
    }
    const room = await prisma.room.update({
        where:{
            roomId:id
        },
        data
    })
    return room
}