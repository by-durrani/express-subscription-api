import { specificUserSchema, userUpdateSchema } from "@lib/request.validation";
import User from "@models/user.model";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // user who does request
    // const user = req.user;

    // -password selection will not select users passwords
    const users = await User.find().select("-password");

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = specificUserSchema.parse(req.params);

    // user who does request
    // const user = req.user;

    // -password selection will not select users passwords
    const user = await User.findById(id).select("-password");

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = specificUserSchema.parse(req.params);
    const { name, password, isAdmin } = userUpdateSchema.parse(req.body);

    // user who does request
    // const user = req.user;

    if (req.user?.id !== id && !req.user?.isAdmin) {
      const error = new Error("Forbidden");
      error.statusCode = 403;
      throw error;
    }

    let hashedPassword;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(
      id,
      { name, password: hashedPassword, isAdmin },
      { new: true }
    );

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
