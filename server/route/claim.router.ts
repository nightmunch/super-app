import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { createRouter } from "../createRouter";
import * as trpc from "@trpc/server";
import { z } from "zod";

export const claimRouter = createRouter()
	.mutation("create", {
		input: z.object({
			id: z.string().cuid().optional(),
			item: z.string().min(1),
			amount: z.number().positive(),
			date: z.date(),
			userId: z.string().cuid(),
		}),
		async resolve({ ctx, input }) {
			try {
				await ctx.prisma.claim.create({
					data: input,
				});
			} catch (e) {
				if (e instanceof PrismaClientKnownRequestError) {
					if (e.code === "P2002") {
						throw new trpc.TRPCError({
							code: "CONFLICT",
							message: "Claim already exists",
						});
					}
				}

				throw new trpc.TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Something went wrong",
				});
			}
		},
	})
	.mutation("update", {
		input: z.object({
			id: z.string().cuid().optional(),
			data: z.object({
				item: z.string(),
				amount: z.number().positive(),
				date: z.date(),
			}),
		}),
		async resolve({ ctx, input }) {
			try {
				await ctx.prisma.claim.update({
					where: {
						id: input.id,
					},
					data: input.data,
				});
			} catch (e) {
				if (e instanceof PrismaClientKnownRequestError) {
					if (e.code === "P2002") {
						throw new trpc.TRPCError({
							code: "CONFLICT",
							message: "Claim already exists",
						});
					}
				}

				throw new trpc.TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Something went wrong",
				});
			}
		},
	})
	.query("all", {
		input: z.object({
			userId: z.string().cuid(),
		}),
		async resolve({ ctx, input }) {
			const { userId } = input;
			/**
			 * For pagination you can have a look at this docs site
			 * @link https://trpc.io/docs/useInfiniteQuery
			 */

			return ctx.prisma.claim.findMany({
				where: { userId },
				orderBy: {
					date: "asc",
				},
			});
		},
	})
	// delete
	.mutation("delete", {
		input: z.object({
			id: z.string(),
		}),
		async resolve({ ctx, input }) {
			const { id } = input;
			await ctx.prisma.claim.delete({ where: { id } });
			return {
				id,
			};
		},
	})
	//
	.query("sum", {
		input: z.object({
			userId: z.string().cuid(),
		}),
		async resolve({ ctx, input }) {
			const { userId } = input;
			/**
			 * For pagination you can have a look at this docs site
			 * @link https://trpc.io/docs/useInfiniteQuery
			 */

			return ctx.prisma.claim.aggregate({
				_sum: {
					amount: true,
				},
				where: { userId },
			});
		},
	})
	// delete
	.mutation("delete-all", {
		input: z.object({
			userId: z.string().cuid(),
		}),
		async resolve({ ctx, input }) {
			const { userId } = input;
			await ctx.prisma.claim.deleteMany({ where: { userId } });
		},
	});
