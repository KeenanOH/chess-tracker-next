import { TRPCError } from "@trpc/server"
import { z } from "zod"

import { Board, selectBoard } from "@/lib/trpc/models/board"
import { authenticatedProcedure, publicProcedure, router } from "@/server/trpc"

export const boardRouter = router({
    create: authenticatedProcedure
        .input(z.object({
            number: z.number().min(1).max(8),
            matchId: z.string(),
            homePlayerId: z.optional(z.string()),
            awayPlayerId: z.optional(z.string())
        }))
        .output(Board)
        .mutation(async ({ ctx, input }) => {
            if (!ctx.user.admin)
                throw new TRPCError({ code: "UNAUTHORIZED" })

            return ctx.prisma.board.create({
                data: input,
                select: selectBoard
            })
        }),
    delete: authenticatedProcedure
        .input(z.object({
            id: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            if (!ctx.user.admin)
                throw new TRPCError({ code: "UNAUTHORIZED" })

            await ctx.prisma.board.delete({
                where: input
            })
        }),
    deleteMany: authenticatedProcedure
        .input(z.object({
            boardIds: z.array(z.string())
        }))
        .mutation(async ({ ctx, input }) => {
            if (!ctx.user.admin)
                throw new TRPCError({ code: "UNAUTHORIZED" })

            await ctx.prisma.board.deleteMany({
                where: {
                    id: {
                        in: input.boardIds
                    }
                }
            })
        }),
    update: authenticatedProcedure
        .input(z.object({
            id: z.string(),
            homePlayerId: z.optional(z.nullable(z.string())),
            awayPlayerId: z.optional(z.nullable(z.string()))
        }))
        .output(Board)
        .mutation(async ({ ctx, input }) => {
            if (ctx.user.admin)
                return ctx.prisma.board.update({
                    data: {
                        homePlayerId: input.homePlayerId,
                        awayPlayerId: input.awayPlayerId
                    },
                    where: {
                        id: input.id
                    },
                    select: selectBoard
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
                },
                select: selectBoard
            })
        }),
    getAll: publicProcedure
        .input(z.optional(z.object({
            matchId: z.optional(z.string())
        })))
        .output(z.array(Board))
        .query(async ({ ctx, input }) =>
            ctx.prisma.board.findMany({
                where: input,
                select: selectBoard
            })
        ),
    get: publicProcedure
        .input(z.object({
            id: z.string()
        }))
        .output(z.nullable(Board))
        .query(async ({ ctx, input }) =>
            ctx.prisma.board.findFirst({
                where: input,
                select: selectBoard
            })
        )
})
