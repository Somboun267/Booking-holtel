import prisma from "../config/prisma.js";

interface HousekeepingInput{
    userId: number
    zoneResponsible?:string
}


export const getHousekeeping = async()=>{
    return await prisma.housekeepingProfile.findMany()
}

export const createHousekepeping = async(data: HousekeepingInput)=>{
    const user = await prisma.user.findUnique({
        where: {
            userId: data.userId
        }
    });
    if(!user){
        throw new Error("user not found")
    }

    const housekeeping = await prisma.housekeepingProfile.create({
        data:{
            userId:data.userId,
            zoneResponsible:data.zoneResponsible
        },
        include:{
            user:{
                select:{
                    username:true,
                    fullName:true,
                    role:{
                        select:{
                            roleName:true  
                        }
                    }
                }
            }
        }
    })
    return housekeeping
}


