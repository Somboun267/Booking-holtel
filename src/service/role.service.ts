import prisma from "../config/prisma.js";


interface createRoleInput {
    roleName : string
    description?: string
}

interface UpdateRoleInput {
    roleName?: string
    description?: string
}


export const getAll = async()=>{
    return await prisma.role.findMany()
}

export const getById = async (id: number) => {
    const role = await prisma.role.findUnique({
        where: {
            roleId: id
        }
    });
    if(!role){
        throw new Error("role not found")
    }
    return role;
};

export const getByName = async (name: string) => {
    return await prisma.role.findFirst({
        where: {
            roleName: name
        }
    });
};

export const createRole = async(data:createRoleInput)=>{
    const role = await prisma.role.create({
      data:{
        roleName: data.roleName,
        description: data.description
      }
    })
    return role
}

export const updateRole = async(id:number,data:UpdateRoleInput)=>{

    const role = await prisma.role.findUnique({
        where:{
            roleId:id
        }
    })
    if(!role){
        throw new Error("role not found")
    }
    const updateRole = await prisma.role.update({
        where:{
            roleId:id,
        },
        data,
        select:{
            roleId:true,
            roleName:true,
            description:true
        }
    })
    return updateRole
}

export const remove = async (id: number) => {
    const role = await prisma.role.findUnique({
        where: {
            roleId: id
        }
    });

    if (!role) {
        throw new Error("Role not found");
    }

    const remove = await prisma.role.delete({
        where: {
            roleId: id
        }
    });

    return remove;
};