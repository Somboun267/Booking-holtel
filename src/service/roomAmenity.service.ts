import prisma from "../config/prisma.js";

interface createAmenityRoom {
    roomId:number
    amenityId:number
}

export const getAmenityRoom = async () => {
    return await prisma.room.findMany({
        select: {
            roomId: true,
            roomNumber: true,
            floor: true,
            status: true,

            roomAmenities: {
                select: {
                    amenity: {
                        select: {
                            amenityId: true,
                            amenityName: true
                        }
                    }
                }
            }
        }
    });
};

export const getID = async (roomID: number) => {

    const amenities = await prisma.roomAmenity.findMany({
        where: {
            roomId: roomID
        },
        include: {
            amenity: {
                select: {
                    amenityId: true,
                    amenityName: true
                }
            }
        }
    });

    if (amenities.length === 0) {
        throw new Error("No amenities found for this room");
    }

    return amenities;
};

export const createAmenityRooms = async (data:createAmenityRoom)=>{
    if(!data.roomId){
        throw new Error("room id not found")
    }
    if(!data.amenityId){
        throw new Error("amenity id not found")
    }
    const amenityRoom = await prisma.roomAmenity.create({
        data:{
            roomId: data.roomId,
            amenityId:data.amenityId,
        },
        include:{
            room:true
        }
    })
    return amenityRoom
}

