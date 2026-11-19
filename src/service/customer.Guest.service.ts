import prisma from "../config/prisma.js";


interface CreateGuestInput {
    fullName: string;
    phone?: string;
    idCardNumber?: string;
    nationality?: string;
    address?: string;
}

export const createGuest = async (data: CreateGuestInput) => {

    if (!data.fullName) {
        throw new Error("Full name is required");
    }
    const guest = await prisma.customer.create({
        data: {
            fullName: data.fullName,
            phone: data.phone,
            idCardNumber: data.idCardNumber,
            nationality: data.nationality,
            address: data.address
        }
    });
    return guest;
};

export const getCustomerGuest = async()=>{
    return await prisma.customer.findMany({
        where:{
            username:null,
            password:null
        },
        select: {
            customerId: true,
            fullName: true,
            phone: true,
            idCardNumber: true
        }
    })
}

  