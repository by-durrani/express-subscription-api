import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "@routes/user.routes";
import authRouter from "@routes/auth.route";
import subscriptionRouter from "@routes/subscription.route";
import errorMiddleware from "@middleware/error.middleware";
import { connectToDB } from "@database/mongodb";
import arcjetMiddleware from "@middleware/arcjet.middleware";

const app = express();

// to handle json data send through api calls
app.use(express.json());

// this will allow form data to be in simpler format
app.use(express.urlencoded({ extended: false }));

// parse cookies from incoming requests
app.use(cookieParser());

app.use(arcjetMiddleware);

const { PORT } = process.env;

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(errorMiddleware);

app.listen(PORT || 3000, async () => {
  try {
    await connectToDB();
    console.log(`server running on http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
