import { claimRouter } from "./claim.router";
import { userRouter } from "./user.router";
import { createRouter } from "../createRouter";

export const appRouter = createRouter()
    .merge('claim.', claimRouter)
    .merge('user.', userRouter)

export type AppRouter = typeof appRouter