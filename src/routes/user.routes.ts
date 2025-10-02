import { getUser, getUsers, updateUser } from "@controllers/user.controller";
import authorize from "@middleware/auth.middleware";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/", authorize, getUsers);

userRouter.get("/:id", authorize, getUser);

userRouter.post("/", (req, res) => {
  res.send("CREATE new user");
});

userRouter.put("/:id", authorize, updateUser);

userRouter.delete("/", (req, res) => {
  res.send("DELETE user");
});

export default userRouter;
