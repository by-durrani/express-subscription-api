/* eslint-disable @typescript-eslint/no-explicit-any */
import { aj } from "@config/arcjet.config";
import { NextFunction, Request, Response } from "express";

const arcjetMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ error: "Rate limit exceeded" });
        return;
      }

      if (decision.reason.isBot()) {
        res.status(403).json({ error: "Bot detected" });
        return;
      }
      res.status(403).json({ error: "Access denied" });
      return;
    }
    next();
  } catch (error) {
    console.error("Arcjet Middleware Error:", error);
    next(error);
  }
};

export default arcjetMiddleware;
