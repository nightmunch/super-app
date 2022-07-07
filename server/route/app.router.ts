import { userRouter } from "./user.router";
import { createRouter } from "../createRouter";

export const appRouter = createRouter().merge('users.', userRouter)

export type AppRouter = typeof appRouter