import prisma from "../config/prisma.js";

 interface CreateBookingInput {
    customerId: number;
    roomId: number;
    checkInDate: Date;
    checkOutDate: Date;
    numGuests: number;
    bookingSource: "walk_in" | "phone" | "website" | "ota";
    createdById?: number;
}
interface UpdateBookingInput {
    checkInDate?: Date;
    checkOutDate?: Date;

    actualCheckIn?: string;
    actualCheckOut?: string;

    numGuests?: number;

    bookingStatus?:
        | "pending"
        | "confirmed"
        | "checked_in"
        | "checked_out"
        | "cancelled";

    bookingSource?:
        | "walk_in"
        | "phone"
        | "website"
        | "ota";
}

export const getbooking = async () => {
    return await prisma.booking.findMany({
        include: {
            customer: {
                select: {
                    customerId: true,
                    fullName: true,
                    email: true,
                    phone: true
                }
            },
            room: {
                select: {
                    roomId: true,
                    roomNumber: true,
                    floor: true,
                    status: true,

                    roomType: {
                        select: {
                            roomTypeId: true,
                            typeName: true,
                            basePrice: true,
                            capacity: true
                        }
                    }
                }
            },
            createdBy: {
                select: {
                    userId: true,
                    fullName: true,
                    username: true
                }
            },

            payments: true
        },
        orderBy: {
            bookingId: "desc"
        }
    });
};


export const createBooking = async (data: CreateBookingInput) => {


    const customer = await prisma.customer.findUnique({
        where: {
            customerId: data.customerId
        }
    });

    if (!customer) {
        throw new Error("Customer not found");
    }


  
    const room = await prisma.room.findUnique({
        where: {
            roomId: data.roomId
        },
        include: {
            roomType: true
        }
    });

    if (!room) {
        throw new Error("Room not found");
    }



    if (!data.checkInDate) {
        throw new Error("Check-in date is required");
    }

    if (!data.checkOutDate) {
        throw new Error("Check-out date is required");
    }

    if (data.checkOutDate <= data.checkInDate) {
        throw new Error("Check-out date must be after check-in date");
    }



    const existingBooking = await prisma.booking.findFirst({
        where: {
            roomId: data.roomId,

            bookingStatus: {
                notIn: ["cancelled", "checked_out"]
            },

            checkInDate: {
                lt: data.checkOutDate
            },

            checkOutDate: {
                gt: data.checkInDate
            }
        }
    });

    if (existingBooking) {
        throw new Error("Room is already booked for this period");
    }


   
    if (data.numGuests <= 0) {
        throw new Error("Number of guests must be greater than 0");
    }

    if (
        room.roomType.capacity !== null &&
        data.numGuests > room.roomType.capacity
    ) {
        throw new Error(
            `Room capacity is ${room.roomType.capacity} guests`
        );
    }


  
    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    const nights = Math.ceil(
        (data.checkOutDate.getTime() -
            data.checkInDate.getTime()) /
        millisecondsPerDay
    );

    // 7. คำนวณราคารวม
    const totalPrice =
        Number(room.roomType.basePrice) * nights;


    // 8. เช็ก createdById ถ้ามีพนักงานสร้าง
    if (data.createdById !== undefined) {

        const user = await prisma.user.findUnique({
            where: {
                userId: data.createdById
            }
        });

        if (!user) {
            throw new Error("Created by user not found");
        }
    }


    // 9. สร้าง Booking
    const booking = await prisma.booking.create({
        data: {
            customerId: data.customerId,
            roomId: data.roomId,
            checkInDate: data.checkInDate,
            checkOutDate: data.checkOutDate,
            numGuests: data.numGuests,
            totalPrice: totalPrice,
            bookingStatus: "pending",
            bookingSource: data.bookingSource,
            createdById: data.createdById
        }
    });

    return booking;
};

export const updateBooking = async (
    id: number,
    data: UpdateBookingInput
) => {

    // 1. เช็ก Booking
    const booking = await prisma.booking.findUnique({
        where: {
            bookingId: id
        }
    });

    if (!booking) {
        throw new Error("Booking not found");
    }


    // 2. วันที่ที่จะใช้ตรวจสอบ
    const checkInDate =
        data.checkInDate ?? booking.checkInDate;

    const checkOutDate =
        data.checkOutDate ?? booking.checkOutDate;


    // 3. เช็กวันที่
    if (checkOutDate <= checkInDate) {
        throw new Error(
            "Check-out date must be after check-in date"
        );
    }


    // 4. เช็กจำนวนผู้เข้าพัก
    if (data.numGuests !== undefined) {

        if (data.numGuests <= 0) {
            throw new Error(
                "Number of guests must be greater than 0"
            );
        }

        const room = await prisma.room.findUnique({
            where: {
                roomId: booking.roomId
            },
            include: {
                roomType: true
            }
        });

        if (!room) {
            throw new Error("Room not found");
        }

        if (
            room.roomType.capacity !== null &&
            data.numGuests > room.roomType.capacity
        ) {
            throw new Error(
                `Room capacity is ${room.roomType.capacity} guests`
            );
        }
    }


    // 5. ถ้าเปลี่ยนวันที่ → เช็ก Booking ชนกัน
    if (
        data.checkInDate !== undefined ||
        data.checkOutDate !== undefined
    ) {

        const existingBooking =
            await prisma.booking.findFirst({
                where: {

                    roomId: booking.roomId,

                    bookingId: {
                        not: id
                    },

                    bookingStatus: {
                        notIn: [
                            "cancelled",
                            "checked_out"
                        ]
                    },

                    checkInDate: {
                        lt: checkOutDate
                    },

                    checkOutDate: {
                        gt: checkInDate
                    }
                }
            });

        if (existingBooking) {
            throw new Error(
                "Room is already booked for this period"
            );
        }
    }


    // 6. คำนวณราคาใหม่ถ้าวันที่เปลี่ยน
    let totalPrice: number | undefined;

    if (
        data.checkInDate !== undefined ||
        data.checkOutDate !== undefined
    ) {

        const millisecondsPerDay =
            1000 * 60 * 60 * 24;

        const nights = Math.ceil(
            (
                checkOutDate.getTime() -
                checkInDate.getTime()
            ) / millisecondsPerDay
        );


        const room = await prisma.room.findUnique({
            where: {
                roomId: booking.roomId
            },
            include: {
                roomType: true
            }
        });

        if (!room) {
            throw new Error("Room not found");
        }


        totalPrice =
            Number(room.roomType.basePrice) * nights;
    }


    // 7. แปลง actualCheckIn / actualCheckOut
    const actualCheckIn =
        data.actualCheckIn !== undefined
            ? new Date(data.actualCheckIn)
            : undefined;

    const actualCheckOut =
        data.actualCheckOut !== undefined
            ? new Date(data.actualCheckOut)
            : undefined;


    // 8. Update
    const result = await prisma.booking.update({
        where: {
            bookingId: id
        },

        data: {
            checkInDate: data.checkInDate,
            checkOutDate: data.checkOutDate,

            actualCheckIn: actualCheckIn,
            actualCheckOut: actualCheckOut,

            numGuests: data.numGuests,

            bookingStatus: data.bookingStatus,

            bookingSource: data.bookingSource,

            totalPrice: totalPrice
        }
    });

    return result;
};