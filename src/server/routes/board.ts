import { z } from "zod"

import { authenticatedProcedure, publicProcedure, router } from "@/server/trpc"
import { TRPCError } from "@trpc/server"

export const boardRouter = router({
    create: authenticatedProcedure
        .input(z.object({
            number: z.number().min(1).max(8),
            matchId: z.string(),
            homePlayerId: z.optional(z.string()),
            awayPlayerId: z.optional(z.string())
        }))
        .mutation(async ({ ctx, input }) => {
            if (!ctx.user.admin)
                throw new TRPCError({ code: "UNAUTHORIZED" })

            return ctx.prisma.board.create({
                data: input
            })
        }),
    delete: authenticatedProcedure
        .input(z.object({
            id: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            if (!ctx.user.admin)
                throw new TRPCError({ code: "UNAUTHORIZED" })

            return ctx.prisma.board.delete({
                where: input
            })
        }),
    update: authenticatedProcedure
        .input(z.object({
            id: z.string(),
            homePlayerId: z.optional(z.nullable(z.string())),
            awayPlayerId: z.optional(z.nullable(z.string()))
        }))
        .mutation(async ({ ctx, input }) => {
            if (ctx.user.admin)
                return ctx.prisma.board.update({
                    data: {
                        homePlayerId: input.homePlayerId,
                        awayPlayerId: input.awayPlayerId
                    },
                    where: {
                        id: input.id
                    }
                })

            if (!ctx.user.schoolId)
                throw new TRPCError({ code: "FORBIDDEN" })

            return ctx.prisma.board.update({
                data: {
                    homePlayerId: input.homePlayerId,
                    awayPlayerId: input.awayPlayerId
                },
                where: {
                    id: input.id,
                    match: {
                        OR: [
                            { homeSchoolId: ctx.user.schoolId },
                            { awaySchoolId: ctx.user.schoolId }
                        ]
                    }
                }
            })
        }),
    getAll: publicProcedure
        .input(z.object({
            matchId: z.string()
        }))
        .query(async ({ ctx, input }) =>
            ctx.prisma.board.findMany({
                where: input
            })
        ),
    get: publicProcedure
        .input(z.object({
            id: z.string()
        }))
        .query(async ({ ctx, input }) =>
            ctx.prisma.board.findFirst({
                where: input,
                select: {
                    id: true,
                    number: true,
                    match: true,
                    homePlayer: true,
                    awayPlayer: true
                }
            })
        )
})
