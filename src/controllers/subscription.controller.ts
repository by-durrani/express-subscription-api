import {
  createSubscriptionSchema,
  specificUserSchema,
} from "@lib/request.validation";
import Subscription from "@models/subscription.model";
import { NextFunction, Request, Response } from "express";

export const createSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    createSubscriptionSchema.parse(req.body);

    const subscription = await Subscription.create({
      ...req.body,
      user: req.user,
    });

    res.status(201).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = specificUserSchema.parse(req.params);

    if (req.user?.id !== id) {
      const error = new Error("You are not the owner of this account");
      error.statusCode = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: id });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user?.isAdmin) {
      const error = new Error("Forbidden");
      error.statusCode = 403;
      throw error;
    }

    const subscriptions = await Subscription.find().limit(
      Number(req.params?.limit) || 10
    );

    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};
