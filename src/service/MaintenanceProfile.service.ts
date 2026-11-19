import prisma from "../config/prisma.js";


interface MaintenanceProfileInput {
    userId:number,
    specialty?:string

}

interface updateMaintenanceInput{
    userId?:number,
    specialty?:string
}

export const getMaintenance = async()=>{
    return await prisma.maintenanceProfile.findMany()
}

export const createMaintenance = async(data:MaintenanceProfileInput)=>{
    
    const user = await prisma.user.findUnique({
        where:{
            userId:data.userId
        }
    })
    if(!user){
        throw new Error ("user not found")
    }
    const maintenance = await prisma.maintenanceProfile.create({
        data:{
            userId:data.userId,
            specialty:data.specialty
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
    return maintenance;
}

export const updatemaintenance = async(id:number,data:updateMaintenanceInput)=>{

    const maintenance = await prisma.maintenanceProfile.findUnique({
        where: {
            userId:id
        }
    });

    if (!maintenance) {
        throw new Error("Maintenance profile not found");
    }

    return await prisma.maintenanceProfile.update({
        where: {
            userId:id
        },
        data: {
            specialty:data.specialty
        }
    });
}