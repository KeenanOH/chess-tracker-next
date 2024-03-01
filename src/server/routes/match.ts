import { z } from "zod"

import { Match, selectMatch } from "@/lib/trpc/models/match"
import { MatchDetail, selectMatchDetail } from "@/lib/trpc/models/matchDetail"
import { adminProcedure, publicProcedure, router } from "@/server/trpc"

export const matchRouter = router({
    createMatch: adminProcedure
        .input(z.object({
            date: z.date(),
            homeSchoolId: z.string(),
            awaySchoolId: z.string()
        }))
        .output(Match)
        .mutation(async ({ ctx, input }) => {
            const match = await ctx.prisma.match.create({
                data: input,
                select: selectMatch
            })

            const boards: { matchId: string, number: number }[] = []
            for (let i = 1; i <= 8; i++) {
                boards.push({ matchId: match.id, number: i })
            }

            await ctx.prisma.board.createMany({
                data: boards,
                skipDuplicates: true,
            })

            return match
        }),
    updateMatch: adminProcedure
        .input(z.object({
            id: z.string(),
            date: z.optional(z.date()),
            homeSchoolId: z.optional(z.string()),
            awaySchoolId: z.optional(z.string()),
            published: z.optional(z.boolean())
        }))
        .output(Match)
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.match.update({
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
    getMatches: publicProcedure
        .input(z.optional(z.object({
            schoolId: z.optional(z.string())
        })))
        .output(z.array(Match))
        .query(async ({ ctx, input }) => {
            if (input?.schoolId)
                return ctx.prisma.match.findMany({
                    where: {
                        OR: [
                            { homeSchoolId: input.schoolId },
                            { awaySchoolId: input.schoolId }
                        ]
                    },
                    select: selectMatch
                })

            return ctx.prisma.match.findMany({
                select: selectMatch
            })
        }),
    deleteMatches: adminProcedure
        .input(z.object({
            ids: z.array(z.string())
        }))
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.match.deleteMany({
                where: {
                    id: {
                        in: input.ids
                    }
                }
            })
        }),
    getMatchesByDate: publicProcedure
        .output(z.array(z.object({
            date: z.date(),
            matches: z.array(Match)
        })))
        .query(async ({ ctx }) => {
            const matchGroups = await ctx.prisma.match.groupBy({
                by: ["date"]
            })

            return await Promise.all(matchGroups.map(async group => (
                {
                    date: group.date,
                    matches: await ctx.prisma.match.findMany({
                        where: {
                            date: group.date
                        },
                        select: selectMatch
                    })
                }
            )))
        }),
    getMatchDetail: publicProcedure
        .input(z.object({
            id: z.string()
        }))
        .output(z.nullable(MatchDetail))
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        .query(async ({ ctx, input }) => {
            return await ctx.prisma.match.findFirst({
                where: input,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                select: selectMatchDetail
            })
        })
})
