import prisma from "../config/prisma.js";
import { validateEmail, validatePassword } from "../utils/validate.js";
import  Jwt  from "jsonwebtoken";
import bcrypt  from 'bcrypt';


interface createCustomerInput{
    username: string
    password:string
    fullName:string
    email?:string
    phone?: string
    idCardNumber?:string
    nationality?:string
    address?:string

}

interface updateCcustomerInput{
    username?:string
    password?:string
    fullName?:string
    email?:string
    phone?:string
    idCardNumber?:string
    nationality?:string
    address?:string
    isActive?:boolean
}

interface loginInput {
    username:string,
    password:string
}

export const getall = async()=>{
    return await prisma.customer.findMany()
}

export const getById = async (id: number) => {

    const customer = await prisma.customer.findUnique({
        where: {
            customerId: id
        }
    });

    if (!customer) {
        throw new Error("customer not found");
    }

    return customer;
};

export const getName = async(name:string)=>{
    const getName = await prisma.customer.findUnique ({
        where:{
            username:name
        }
    })
    if(!getName){
        throw new Error ("username not found")
    }
    return getName;
}

export const create = async(data:createCustomerInput)=>{

    if(!data.fullName){
        throw new Error("fullname is required")
    }
    if(!data.username){
        throw new Error("username is required")
    }
    if(!data.password){
        throw new Error("password is required")
    }

    if(data.email){
        validateEmail(data.email)
    }
    validatePassword(data.password)

    const exitingUser = await prisma.customer.findUnique({
        where:{
            username:data.username
        }
    })
    if(exitingUser){
       throw new Error("username already exists ")
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);

   const createCustomer = await prisma.customer.create({
    data:{
         username:data.username,
         password:hashedPassword,
         fullName:data.fullName,
         email:data.email,
         phone:data.phone,
         idCardNumber:data.idCardNumber,
         nationality:data.nationality,
         address:data.address
    }
  
});
return createCustomer
 
}


export const login = async (data: loginInput) => {

    if (!data.username) {
        throw new Error("Username is required");
    }

    if (!data.password) {
        throw new Error("Password is required");
    }

    const customer = await prisma.customer.findUnique({
        where: {
            username: data.username
        }
    });

    if (!customer) {
        throw new Error("Username or password incorrect");
    }

    if (!customer.isActive) {
        throw new Error("Customer account is inactive");
    }

    const isMatch = await bcrypt.compare(
        data.password,
        customer.password!
    );

    if (!isMatch) {
        throw new Error("Username or password incorrect");
    }

   const token = Jwt.sign(
    {
        id:customer.customerId,
        role: "customer"
    },
    process.env.ACCESS_TOKEN as string,
    {
        expiresIn:"1d",
    }

   )
   return {
    token,
    customer: {
        id: customer.customerId,
        username: customer.username,
        fullName: customer.fullName,
        email: customer.email,
        phone: customer.phone
    }
};
}

export const update  = async(id:number ,data:updateCcustomerInput)=>{
    const customer = await prisma.customer.findUnique({
        where:{
            customerId:id
        }
    })
    if(!customer){
        throw new Error("customer not found")
    }

    if(data.password){
           data.password = await bcrypt.hash(data.password, 10);
         }

    const updateCustomer = await prisma.customer.update({
        where: {
            customerId: id
        },
        data: {
            username: data.username,
            password: data.password,
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            idCardNumber: data.idCardNumber,
            nationality: data.nationality,
            address: data.address,
            isActive: data.isActive
        }
    });

    const { password, ...safepassword } = updateCustomer;

    return safepassword;
    
    }
