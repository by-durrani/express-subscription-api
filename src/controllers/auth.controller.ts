/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@models/user.model";
import { NextFunction, Request, Response } from "express";
import { startSession } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signInSchema, signUpSchema } from "@lib/request.validation";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // for DB transactions
  const session = await startSession();
  session.startTransaction();

  try {
    // validate body if credentials are full filled
    const { name, email, password } = signUpSchema.parse(req.body);

    // check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    // hash a password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create(
      [{ name, password: hashedPassword, email }],
      { session }
    );

    const token = jwt.sign(
      { userId: newUsers[0]._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRY as any,
      }
    );

    // commit and end the session of transaction
    await session.commitTransaction();
    session.endSession();

    // send response
    res.status(201).json({
      success: true,
      message: "User created Successfully",
      data: {
        token,
        user: newUsers[0],
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // validate body if credentials are full filled
    const { email, password } = signInSchema.parse(req.body);

    // check existing user
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid Password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRY as any,
      }
    );

    // send response
    res.status(200).json({
      success: true,
      message: "User signed in Successfully",
      data: {
        token,
        user: user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
