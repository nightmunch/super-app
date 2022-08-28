import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { createRouter } from "../createRouter";
import * as trpc from '@trpc/server'
import { z } from 'zod';
import axios from "axios";

export const netWorthRouter = createRouter()
    .query('all', {
        input: z.object({
            userId: z.string().cuid(),
        }),
        async resolve({ctx, input}) {
            const { userId } = input;
            /**
             * For pagination you can have a look at this docs site
             * @link https://trpc.io/docs/useInfiniteQuery
             */

            return ctx.prisma.netWorth.findMany({
                where: {userId},
            });
        },
    })
    .mutation('create', {
        input: z.object({
            id: z.string().cuid().optional(),
            item: z.string(),
            category: z.string(),
            amount: z.number().positive(),
            currency: z.string(),
            remarks: z.string().optional(),
            userId: z.string().cuid()
          }),
        async resolve({ctx, input}) {
            try{
                await ctx.prisma.netWorth.create({
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
    .mutation('update', {
        input: z.object({
            id: z.string().cuid().optional(),
            data:z.object({
                item: z.string(),
                category: z.string(),
                amount: z.number().positive(),
                currency: z.string(),
                remarks: z.string().optional(),
                userId: z.string().cuid()
            })
        }),
        async resolve({ctx, input}) {
            // console.log(input);
            try{
                await ctx.prisma.netWorth.update({
                    where: {
                        id: input.id
                    },
                    data: input.data
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
    // delete
    .mutation('delete', {
        input: z.object({
            id: z.string(),
        }),
        async resolve({ ctx, input }) {
            const { id } = input;
            await ctx.prisma.netWorth.delete({ where: { id } });
            return {
                id,
            };
        },
    })
    //
    .query('sum', {
        input: z.object({
            userId: z.string().cuid(),
        }),
        async resolve({ctx, input}) {
            const { userId } = input;
            /**
             * For pagination you can have a look at this docs site
             * @link https://trpc.io/docs/useInfiniteQuery
             */

            return ctx.prisma.netWorth.aggregate({
                _sum: {
                  amount: true,
                },
                where: {
                    userId,
                    currency: 'RM'
                },
              })
        },
    })
    .query('cryptoprice', {
        input: z.object({
            crypto: z.string()
        }),
        async resolve({ctx, input}) {
            const { crypto } = input;
            const res = await axios(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=myr`);
            return await {
                data: res.data.ethereum.myr
            }
        },
    })
