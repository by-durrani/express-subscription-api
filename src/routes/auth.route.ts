import { signIn, signOut, signUp } from "@controllers/auth.controller";
import { Router } from "express";

const authRouter = Router();

// path: /api/v1/auth/(...) (POST)
authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.post("/sign-out", signOut);

export default authRouter;
