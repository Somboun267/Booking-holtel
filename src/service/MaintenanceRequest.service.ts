import prisma from "../config/prisma.js";

interface createMaintenanceRequestInput{
    roomId: number,
    reportedById:number,
    issueDescription:string
}

interface UpdateMaintenanceRequestInput {
    assignedToMaintenanceId?: number;
    status?: "pending" | "in_progress" | "resolved";
    resolvedAt?: Date;
}

export const getAll = async () => {
    return await prisma.maintenanceRequest.findMany({
        include: {
            room: {
                select: {
                    roomNumber: true
                }
            },
            reportedBy: {
                select: {
                    userId: true,
                    username: true
                }
            },
            assignedMaintenance: {
                select: {
                    userId: true,
                    specialty: true,
                    user: {
                        select: {
                            fullName: true
                        }
                    }
                }
            }
        }
    });
};

export const createMaintenance = async (
    roomId: number,
    reportedById: number,
    issueDescription: string
) => {

    // เช็ก Room
    const room = await prisma.room.findUnique({
        where: {
            roomId: roomId
        }
    });

    if (!room) {
        throw new Error("Room not found");
    }

    // เช็ก User ที่แจ้ง
    const user = await prisma.user.findUnique({
        where: {
            userId: reportedById
        }
    });

    if (!user) {
        throw new Error("User not found");
    }

    // เช็กรายละเอียด
    if (!issueDescription.trim()) {
        throw new Error("Issue description is required");
    }

    // สร้าง Maintenance Request
    const maintenance =
        await prisma.maintenanceRequest.create({
            data: {
                roomId: roomId,
                reportedById: reportedById,
                issueDescription: issueDescription
            }
        });

    return maintenance;
};

export const updateMaintenanceRequest = async (id: number,data: UpdateMaintenanceRequestInput) => {

    const maintenanceRequest =
        await prisma.maintenanceRequest.findUnique({
            where: {
                requestId: id
            }
        });

    if (!maintenanceRequest) {
        throw new Error("Maintenance request not found");
    }


    if (data.assignedToMaintenanceId !== undefined) {

        const staff = await prisma.maintenanceProfile.findUnique({
            where: {
                userId: data.assignedToMaintenanceId
            }
        });

        if (!staff) {
            throw new Error("Maintenance staff not found");
        }
    }

    // 3. Update Maintenance Request
    const result = await prisma.maintenanceRequest.update({
        where: {
            requestId: id
        },
        data: {
            assignedToMaintenanceId:data.assignedToMaintenanceId,
            status:data.status
        }
    });

 
    if (data.status === "in_progress" &&maintenanceRequest.roomId !== null) {
        await prisma.room.update({
            where: {
                roomId: maintenanceRequest.roomId
            },
            data: {
                status: "maintenance"
            }
        });
    }


    if ( data.status === "resolved" && maintenanceRequest.roomId !== null) {
        await prisma.room.update({
            where: {
                roomId: maintenanceRequest.roomId
            },
            data: {
                status: "available"
            }
        });
    }

    return result;
};