import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { createRouter } from "../createRouter";
import * as trpc from '@trpc/server'
import { z } from 'zod';

export const transactionRouter = createRouter()
    .mutation('create', {
        input: z.object({
            id: z.string().cuid().optional(),
            item: z.string().min(1),
            amount: z.number().positive(),
            category: z.string().min(1),
            remarks: z.string(),
            date: z.date(),
            userId: z.string().cuid()
        }),
        async resolve({ctx, input}) {
            try{
                await ctx.prisma.transactions.create({
                    data : input
                })
            }catch(e){
                if(e instanceof PrismaClientKnownRequestError){
                    if(e.code === 'P2002'){
                        throw new trpc.TRPCError({
                            code: 'CONFLICT',
                            message: 'Claim already exists'
                        })
                    }
                }

                throw new trpc.TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Something went wrong'
                })
            }
        },
    })
    .query('list-by-month', {
        input: z.object({
            userId: z.string().cuid(),
            month: z.number().positive()
        }),
        async resolve({ctx, input}) {
            const { userId, month } = input;

            const date = new Date(new Date().getFullYear(), month - 1);
            const first_date = new Date(date.getFullYear(), date.getMonth(), 1);
            const last_date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            
            /**
             * For pagination you can have a look at this docs site
             * @link https://trpc.io/docs/useInfiniteQuery
             */

            return ctx.prisma.transactions.findMany({
                where: {
                    userId, 
                    date: {
                        gte: first_date,
                        lt: last_date
                    }
                },
                orderBy: {
                    date: 'asc',
                },
            });
        },
    })
    // delete
    .mutation('delete', {
        input: z.object({
            id: z.string(),
        }),
        async resolve({ ctx, input }) {
            const { id } = input;
            await ctx.prisma.transactions.delete({ where: { id } });
            return {
                id,
            };
        },
    })
    // summary
    .query('summary-by-month', {
        input: z.object({
            userId:z.string().cuid(),
            month: z.number().positive()
        }),
        async resolve({ctx, input}) {
            const { userId, month } = input;

            const date = new Date(new Date().getFullYear(), month - 1);
            const first_date = new Date(date.getFullYear(), date.getMonth(), 1);
            const last_date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            
            /**
             * For pagination you can have a look at this docs site
             * @link https://trpc.io/docs/useInfiniteQuery
             */

            return ctx.prisma.transactions.groupBy({
                by: ['category'],
                where: {
                    userId, 
                    date: {
                        gte: first_date,
                        lt: last_date
                    }
                },
                _sum: {
                    amount: true
                },
                orderBy: {
                    _sum: {
                        amount: 'desc'
                    }
                }

            });
        },
    })
    // max spend
    .query('total-spent', {
        input: z.object({
            userId:z.string().cuid(),
            month: z.number().positive()
        }),
        async resolve({ctx, input}) {
            const { userId, month } = input;

            const date = new Date(new Date().getFullYear(), month - 1);
            const first_date = new Date(date.getFullYear(), date.getMonth(), 1);
            const last_date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            
            /**
             * For pagination you can have a look at this docs site
             * @link https://trpc.io/docs/useInfiniteQuery
             */

            return ctx.prisma.transactions.aggregate({
                where: {
                    userId, 
                    date: {
                        gte: first_date,
                        lt: last_date
                    }
                },
                _sum: {
                    amount: true
                },
            });
        },
    })