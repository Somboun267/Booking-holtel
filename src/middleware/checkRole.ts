import type { Request, Response, NextFunction } from "express";

export const checkRole = (allowedRoles: string[]) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (!user.role) {
      return res.status(401).json({
        message: "No role found",
      });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        message: `${user.role} not allowed`,
      });
    }

    next();
  };
};