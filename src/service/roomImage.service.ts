import path from "path";
import prisma from "../config/prisma.js";
import fs from "fs/promises";

interface createroomImageInput{
    roomId:number,
    files: Express.Multer.File[]
}

export const createRoomImages = async (data: createroomImageInput) => {
    const room = await prisma.room.findUnique({
        where: {
            roomId: data.roomId
        }
    });

    if (!room) {
        throw new Error("Room not found");
    }

    if (data.files.length === 0) {
        throw new Error("At least one image is required");
    }

  
    await prisma.roomImage.deleteMany({
        where: {
            roomId: data.roomId
        }
    });

    // add room image
    const result = await prisma.roomImage.createMany({
        data: data.files.map((file) => ({
            roomId: data.roomId,
            imageUrl: `/uploads/${file.filename}`
        }))
    });

    return result;
};
export const getRoomImages = async () => {
    return await prisma.roomImage.findMany({
        orderBy:{
            imageId: "asc"
        }
    });
};

export const deleteRoomImage = async (id: number) => {

    const image = await prisma.roomImage.findUnique({
        where: {
            imageId:id
        }
    });

    if (!image) {
        throw new Error("Room image not found");
    }

    // ลบไฟล์จาก uploads
    const filename = path.basename(image.imageUrl ?? "");
    const filePath = path.join("uploads", filename);

    try {
        await fs.unlink(filePath);
    } catch (error) {
        console.log("File not found:", filePath);
    }

    // ลบข้อมูลจาก DB
    await prisma.roomImage.delete({
        where: {
            imageId:id
        }
    });

    return image;
};
