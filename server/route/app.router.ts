import { createRouter } from "../createRouter";
import { claimRouter } from "./claim.router";
import { userRouter } from "./user.router";
import { transactionRouter } from "./transaction.router";

export const appRouter = createRouter()
    .merge('claim.', claimRouter)
    .merge('user.', userRouter)
    .merge('transaction.', transactionRouter)

export type AppRouter = typeof appRouter