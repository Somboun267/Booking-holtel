import prisma from "../config/prisma.js";


interface createFrontdeskInput {
    userId: number
    shift: "morning" | "afternoon" | "night"
}

export const getAll = async()=>{
    return await prisma.frontDeskProfile.findMany()
}
export const createFrontdesk = async (data: createFrontdeskInput) => {

    const user = await prisma.user.findUnique({
        where: {
            userId: data.userId
        }
    });

    if (!user) {
        throw new Error("User not found");
    }

    const frontdesk = await prisma.frontDeskProfile.create({
        data: {
            userId: data.userId,
            shift: data.shift
        },
        include: {
            user: {
                select: {
                    username: true,
                    fullName: true,
                    role: {
                        select: {
                            roleName: true
                        }
                    }
                }
            }
        }
    });

    return frontdesk;
};
