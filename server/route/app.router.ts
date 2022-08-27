import { createRouter } from "../createRouter";
import { claimRouter } from "./claim.router";
import { userRouter } from "./user.router";
import { transactionRouter } from "./transaction.router";
import { netWorthRouter } from "./networth.router";

export const appRouter = createRouter()
    .merge('claim.', claimRouter)
    .merge('user.', userRouter)
    .merge('transaction.', transactionRouter)
    .merge('networth.', netWorthRouter)

export type AppRouter = typeof appRouter