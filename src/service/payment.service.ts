import prisma from "../config/prisma.js";

interface CreatePaymentInput {
    bookingId: number;
    amount: number;
    paymentMethod: | "cash" | "credit_card"| "bank_transfer"| "promptpay";
}
interface UpdatePaymentInput {
    paymentStatus?:| "pending"| "paid"| "refunded"| "failed";
}


export const getPayment = async()=>{
    return await prisma.payment.findMany()
}

export const createPayment = async(data:CreatePaymentInput)=>{
    
    const booking = await prisma.booking.findUnique({
        where:{
            bookingId:data.bookingId
        }
    })
    if(!booking){
        throw new Error("booking not found")
    }

    const payment = await prisma.payment.create({
        data:{
            bookingId: data.bookingId,
            amount:data.amount,
            paymentMethod:data.paymentMethod
        }
    })
    return payment
}

export const updatePayment = async (id: number,data: UpdatePaymentInput) => {

    const payment = await prisma.payment.findUnique({
        where: {
            paymentId: id
        }
    });

    if (!payment) {
        throw new Error("Payment not found");
    }

    const result = await prisma.payment.update({
        where: {
            paymentId: id
        },
        data: {
            paymentStatus: data.paymentStatus,

            ...(data.paymentStatus === "paid" && {
                paidAt: new Date()
            })
        }
    });

    return result;
};