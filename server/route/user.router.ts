import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { createUserSchema } from "../../schema/user.schema";
import { createRouter } from "../createRouter";
import * as trpc from '@trpc/server'
import { z } from 'zod';

export const userRouter = createRouter()
    .mutation('register-user', {
        input: createUserSchema,
        async resolve({ctx, input}) {
            const {email, name} = input
            try{
                const user = await ctx.prisma.user.create({
                    data: {
                        email,
                        name
                    }
                })
            }catch(e){
                if(e instanceof PrismaClientKnownRequestError){
                    if(e.code === 'P2002'){
                        throw new trpc.TRPCError({
                            code: 'CONFLICT',
                            message: 'User already exists'
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
    .query('byEmail', {
        input: z.object({
          email: z.string(),
        }),
        async resolve({ ctx, input }) {
          const { email } = input;
          const user = await ctx.prisma.user.findUnique({
            where: { email },
          });
          if (!user) {
            throw new trpc.TRPCError({
              code: 'NOT_FOUND',
              message: `No user with email '${email}'`,
            });
          }
          return user;
        },
    })
    .mutation('changeName', {
        input:z.object({
            email:z.string(),
            name:z.string()
        }),
        async resolve({ ctx, input }) {
            try{
                await ctx.prisma.user.update({
                    where: {
                        email: input.email
                    },
                    data: {
                        name: input.name
                    }
                })
            }catch(e){
                throw new trpc.TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Something went wrong'
                })
            }
        },
    })
