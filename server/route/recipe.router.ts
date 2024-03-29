import { z } from "zod";
import { createRouter } from "../createRouter";

export const recipeRouter = createRouter()
	.query("list", {
		input: z.object({
			search: z.string(),
		}),
		async resolve({ ctx, input }) {
			const { search } = input;
			return ctx.prisma.recipe.findMany({
				where: {
					title: {
						...(search != "" ? { contains: search } : {}),
						mode: "insensitive",
					},
				},
				orderBy: {
					date: "asc",
				},
			});
		},
	})
	.query("show", {
		input: z.object({
			id: z.string(),
		}),
		async resolve({ ctx, input }) {
			const { id } = input;
			return ctx.prisma.recipe.findUnique({
				where: {
					id,
				},
			});
		},
	})
	.mutation("create", {
		input: z.object({
			title: z.string(),
			description: z.string(),
			ingredient: z.string(),
			step: z.string(),
		}),
		async resolve({ ctx, input }) {
			const { title, description, ingredient, step } = input;
			return ctx.prisma.recipe.create({
				data: {
					title,
					description,
					ingredient,
					step,
				},
			});
		},
	})
	.mutation("update", {
		input: z.object({
			id: z.string().cuid(),
			title: z.string(),
			description: z.string(),
			ingredient: z.string(),
			step: z.string(),
		}),
		async resolve({ ctx, input }) {
			const { id, title, description, ingredient, step } = input;
			return ctx.prisma.recipe.update({
				where: { id },
				data: {
					title,
					description,
					ingredient,
					step,
				},
			});
		},
	})
	.mutation("delete", {
		input: z.object({
			id: z.string().cuid(),
		}),
		async resolve({ ctx, input }) {
			const { id } = input;
			return ctx.prisma.recipe.delete({
				where: { id },
			});
		},
	});
