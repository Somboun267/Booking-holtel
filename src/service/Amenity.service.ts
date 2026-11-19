import prisma from "../config/prisma.js";

interface createAmenityInput{
    amenityName:string
}

export const getAmenity = async()=>{
    return await prisma.amenity.findMany({
        orderBy: {
            amenityId: "asc"
        }
    })
}

export const createAmenity = async (data: createAmenityInput) => {

    const existingAmenity = await prisma.amenity.findUnique({
        where: {
            amenityName: data.amenityName
        }
    });

    if (existingAmenity) {
        throw new Error("Amenity already exists");
    }

    const amenity = await prisma.amenity.create({
        data: {
            amenityName: data.amenityName
        }
    });

    return amenity;
};