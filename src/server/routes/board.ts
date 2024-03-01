import { TRPCError } from "@trpc/server"
import { z } from "zod"

import { Board, selectBoard } from "@/lib/trpc/models/board"
import { authenticatedProcedure, publicProcedure, router } from "@/server/trpc"

export const boardRouter = router({
    updateBoard: authenticatedProcedure
        .input(z.object({
            id: z.string(),
            homePlayerId: z.optional(z.nullable(z.string())),
            awayPlayerId: z.optional(z.nullable(z.string())),
            result: z.optional(z.string())
        }))
        .mutation(async ({ ctx, input }) => {
            if (ctx.user.admin) {
                await ctx.prisma.board.update({
                    data: {
                        homePlayerId: input.homePlayerId,
                        awayPlayerId: input.awayPlayerId,
                        result: input.result
                    },
                    where: {
                        id: input.id
                    },
                    select: selectBoard
                })

                return
            }

            if (!ctx.user.schoolId)
                throw new TRPCError({ code: "FORBIDDEN" })

            await ctx.prisma.board.update({
                data: {
                    homePlayerId: input.homePlayerId,
                    awayPlayerId: input.awayPlayerId,
                    result: input.result
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
    getBoards: publicProcedure
        .input(z.object({
            matchId: z.string()
        }))
        .output(z.array(Board))
        .query(async ({ ctx, input }) => {
            return await ctx.prisma.board.findMany({
                where: input,
                select: selectBoard
            })
        })
})
