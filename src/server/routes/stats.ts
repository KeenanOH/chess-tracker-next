import { z } from "zod"

import { publicProcedure, router } from "@/server/trpc"

export const statsRouter = router({
    getTotalStats: publicProcedure
        .query(async ({ ctx }) => {
            const schools = await ctx.prisma.school.count()
            const players = await ctx.prisma.player.count()
            const matches = await ctx.prisma.match.count()
            const boards = await ctx.prisma.board.count()

            return { schools, players, matches, boards }
        }),
    getSchoolStats: publicProcedure
        .input(z.object({
            schoolId: z.string()
        }))
        .query(async ({ ctx, input }) => {
            const schools = await ctx.prisma.school.count({ where: { id: input.schoolId } })
            const players = await ctx.prisma.player.count({ where: input })
            const matches = await ctx.prisma.match.count({
                where: {
                    OR: [
                        { homeSchoolId: input.schoolId },
                        { awaySchoolId: input.schoolId }
                    ]
                }
            })
            const boards = await ctx.prisma.board.count({
                where: {
                    match: {
                        OR: [
                            { homeSchoolId: input.schoolId },
                            { awaySchoolId: input.schoolId }
                        ]
                    }
                }
            })

            return { schools, players, matches, boards }
        }),
    getPlayerStats: publicProcedure
        .input(z.object({
            playerId: z.string()
        }))
        .query(async ({ ctx, input }) => {
            const wins = await ctx.prisma.board.count({
                where: {
                    OR: [
                        { homePlayerId: input.playerId, result: "home" },
                        { awayPlayerId: input.playerId, result: "away" }
                    ]
                }
            })
            const losses = await ctx.prisma.board.count({
                where: {
                    OR: [
                        { homePlayerId: input.playerId, result: "away" },
                        { awayPlayerId: input.playerId, result: "home" }
                    ]
                }
            })
            const draws = await ctx.prisma.board.count({
                where: {
                    OR: [
                        { homePlayerId: input.playerId, result: "draw" },
                        { awayPlayerId: input.playerId, result: "draw" }
                    ]
                }
            })

            return { wins, losses, draws }
        })
})
