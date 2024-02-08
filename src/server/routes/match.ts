import { TRPCError } from "@trpc/server"
import { z } from "zod"

import { Match, selectMatch } from "@/lib/trpc/models/match"
import { authenticatedProcedure, publicProcedure, router } from "@/server/trpc"

export const matchRouter = router({
    create: authenticatedProcedure
        .input(z.object({
            date: z.date(),
            homeSchoolId: z.string(),
            awaySchoolId: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            if (!ctx.user.admin)
                throw new TRPCError({ code: "UNAUTHORIZED" })

            const match = await ctx.prisma.match.create({
                data: input,
            })

            const boards: { matchId: string, number: number }[] = []
            for (let i = 1; i <= 8; i++) {
                boards.push({ matchId: match.id, number: i })
            }

            await ctx.prisma.board.createMany({
                data: boards,
                skipDuplicates: true,
            })
        }),
    update: authenticatedProcedure
        .input(z.object({
            id: z.string(),
            date: z.optional(z.date()),
            homeSchoolId: z.optional(z.string()),
            awaySchoolId: z.optional(z.string()),
            published: z.optional(z.boolean())
        }))
        .output(Match)
        .mutation(async ({ ctx, input }) => {
            if (!ctx.user.admin)
                throw new TRPCError({ code: "UNAUTHORIZED" })

            return ctx.prisma.match.update({
                data: {
                    date: input.date,
                    homeSchoolId: input.homeSchoolId,
                    awaySchoolId: input.awaySchoolId,
                    published: input.published
                },
                where: {
                    id: input.id
                },
                select: selectMatch
            })
        }),
    delete: authenticatedProcedure
        .input(z.object({
            id: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            if (!ctx.user.admin)
                throw new TRPCError({ code: "UNAUTHORIZED" })

            await ctx.prisma.match.delete({
                where: input
            })
        }),
    getAll: publicProcedure
        .input(z.optional(z.object({
            date: z.optional(z.string()),
            homeSchoolId: z.optional(z.string()),
            awaySchoolId: z.optional(z.string()),
            published: z.optional(z.boolean())
        })))
        .output(z.array(Match))
        .query(async ({ ctx, input }) =>
            ctx.prisma.match.findMany({
                where: input,
                select: selectMatch
            })
        ),
    get: publicProcedure
        .input(z.object({
            id: z.string()
        }))
        .output(z.nullable(Match))
        .query(({ ctx, input }) =>
            ctx.prisma.match.findFirst({
                where: input,
                select: selectMatch
            })
        ),
    deleteMany: authenticatedProcedure
        .input(z.object({
            matchIds: z.array(z.string())
        }))
        .mutation(({ ctx, input }) => {
            if (!ctx.user.admin)
                throw new TRPCError({ code: "UNAUTHORIZED" })

            return ctx.prisma.match.deleteMany({
                where: {
                    id: {
                        in: input.matchIds
                    }
                }
            })
        })
})
