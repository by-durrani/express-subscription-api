import {
  createSubscription,
  getSubscriptions,
  getUserSubscriptions,
} from "@controllers/subscription.controller";
import authorize from "@middleware/auth.middleware";
import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", authorize, getSubscriptions);

subscriptionRouter.get("/:id", (req, res) => {
  res.send("GET subscription details");
});

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", (req, res) => {
  res.send("UPDATE subscription");
});

subscriptionRouter.delete("/:id", (req, res) => {
  res.send("DELETE subscription");
});

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send("CANCEL subscription");
});

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send("GET upcoming renewals");
});

export default subscriptionRouter;
