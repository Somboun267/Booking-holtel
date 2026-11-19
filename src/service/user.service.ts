import prisma from "../config/prisma.js";
import Jwt from "jsonwebtoken";
import bcrypt, { compare } from "bcrypt";
import { validateEmail, validatePassword } from "../utils/validate.js";


interface createUserInput {
  username: string;
  password: string;
  fullName?: string;
  email?: string;
  phone?: string;
  roleId: number;
}

interface LoginInput {
  username: string;
  password: string;
}

interface updateUserInput {
  username?: string;
  password?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  roleId?: number;
  isActive?: boolean;
}

export const getAlluser = async () => {
  return await prisma.user.findMany({
    include: {
      role: true,
    },
  });
};

export const getbyId = async (id: number) => {
  const getbyId = await prisma.user.findUnique({
    where: {
      userId: id,
    },
    include: {
      role: true,
    },
  });
  if (!getbyId) {
    throw new Error("user not found");
  }
  return getbyId;
};

export const createUser = async (data: createUserInput) => {
  if (!data.username) {
    throw new Error("username is required");
  }
  if (!data.password) {
    throw new Error("password is required");
  }
  const existingUser = await prisma.user.findUnique({
    where: {
      username: data.username,
    },
  });

  if (existingUser) {
    throw new Error("Username already exists");
  }
  if (data.email) {
    validateEmail(data.email);
  }

  validatePassword(data.password);

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      username: data.username,
      password: hashedPassword,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      roleId: data.roleId,
    },
  });
  const { password, ...safeUser } = user;
  return safeUser;
};

export const login = async (data: LoginInput) => {
  const user = await prisma.user.findUnique({
    where: {
      username: data.username,
    },
    include: {
      role: true,
    },
  });

  if (!user) {
    throw new Error("Username or password incorrect");
  }

  const isMatch = await bcrypt.compare(data.password, user.password);

  if (!isMatch) {
    throw new Error("Username or password incorrect");
  }

  const token = Jwt.sign(
    {
      id: user.userId,
      role: user.role.roleName,
    },
    process.env.ACCESS_TOKEN as string,
    {
      expiresIn: "1d",
    }
  );

  return {
    user: {
      id: user.userId,
      username: user.username,
      fullName: user.fullName,
      role: user.role.roleName,
    },
    token,
  };
};

export const updateUser = async (id: number, data: updateUserInput) => {
  const user = await prisma.user.findUnique({
    where: {
      userId: id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  return await prisma.user.update({
    where: {
      userId: id,
    },
    data: {
      username: data.username,
      password: data.password,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      roleId: data.roleId,
      isActive: data.isActive,
    },
    select: {
        userId: true,
        username: true,
        fullName: true,
        email: true,
        phone: true,
        roleId: true,
        isActive: true,
        role: true,
    }
  });
};
