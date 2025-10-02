import { userSchema } from "@models/user.model";
import { HydratedDocument, InferSchemaType } from "mongoose";

export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URI?: string;
      JWT_SECRET?: string;
      JWT_EXPIRY?: string;
      ARCJET_KEY?: string;
      ARCJET_ENV?: string;
    }
  }

  interface Error {
    statusCode?: number;
  }

  namespace Express {
    interface Request {
      user?: HydratedDocument<
        Omit<InferSchemaType<typeof userSchema>, "password">
      >;
    }
  }
}
