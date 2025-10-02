/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@models/user.model";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const authorize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const token = req.headers.authorization.split(" ")[1];

      // we should have only payload in object not string
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      // storing user data for reference
      req.user = user;

      next();
      return;
    }
    res.status(401).json({ message: "Unauthorized" });
  } catch (error: any) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};

export default authorize;
