import { TRPCError } from "@trpc/server"
import { z } from "zod"

import { Player, selectPlayer } from "@/lib/trpc/models/player"
import { PlayerDetail, selectPlayerDetail } from "@/lib/trpc/models/playerDetail"
import { authenticatedProcedure, publicProcedure, router } from "@/server/trpc"

export const playerRouter = router({
    create: authenticatedProcedure
        .input(z.object({
            firstName: z.string(),
            lastName: z.string(),
            schoolId: z.optional(z.string())
        }))
        .output(Player)
        .mutation(async ({ ctx, input }) => {
            if (ctx.user.admin && input.schoolId)
                return ctx.prisma.player.create({
                    data: {
                        firstName: input.firstName,
                        lastName: input.lastName,
                        schoolId: input.schoolId
                    },
                    select: selectPlayer
                })

            if (!ctx.user.schoolId)
                throw new TRPCError({ code: "FORBIDDEN" })

            return ctx.prisma.player.create({
                data: {
                    ...input,
                    schoolId: ctx.user.schoolId
                },
                select: selectPlayer
            })
        }),
    delete: authenticatedProcedure
        .input(z.object({
            id: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            if (ctx.user.admin)
                return ctx.prisma.player.delete({
                    where: {
                        id: input.id,
                    }
                })

            if (!ctx.user.schoolId)
                throw new TRPCError({ code: "FORBIDDEN" })

            await ctx.prisma.player.delete({
                where: {
                    id: input.id,
                    schoolId: ctx.user.schoolId
                }
            })
        }),
    deleteMany: authenticatedProcedure
        .input(z.object({
            playerIds: z.array(z.string())
        }))
        .mutation(async ({ ctx, input }) => {
            if (ctx.user.admin)
                return ctx.prisma.player.deleteMany({
                    where: {
                        id: {
                            in: input.playerIds
                        }
                    }
                })

            if (!ctx.user.schoolId)
                throw new TRPCError({ code: "FORBIDDEN" })

            await ctx.prisma.player.deleteMany({
                where: {
                    id: {
                        in: input.playerIds
                    },
                    schoolId: ctx.user.schoolId
                }
            })
        }),
    update: authenticatedProcedure
        .input(z.object({
            id: z.string(),
            firstName: z.optional(z.string()),
            lastName: z.optional(z.string()),
            schoolId: z.optional(z.string())
        }))
        .output(Player)
        .mutation(async ({ ctx, input }) => {
            if (ctx.user.admin)
                return ctx.prisma.player.update({
                    data: {
                        firstName: input.firstName,
                        lastName: input.lastName,
                        schoolId: input.schoolId
                    },
                    where: {
                        id: input.id
                    },
                    select: selectPlayer
                })

            if (!ctx.user.schoolId)
                throw new TRPCError({ code: "FORBIDDEN" })

            return ctx.prisma.player.update({
                data: {
                    firstName: input.firstName,
                    lastName: input.lastName
                },
                where: {
                    id: input.id,
                    schoolId: ctx.user.schoolId
                },
                select: selectPlayer
            })
        }),
    getAll: publicProcedure
        .input(z.optional(
            z.object({
                schoolId: z.string()
            })
        ))
        .output(z.array(Player))
        .query(async ({ ctx, input }) =>
            ctx.prisma.player.findMany({
                where: input,
                select: selectPlayer
            })
        ),
    get: publicProcedure
        .input(z.object({
            id: z.string()
        }))
        .output(z.nullable(PlayerDetail))
        .query(({ ctx, input }) =>
            ctx.prisma.player.findFirst({
                where: input,
                select: selectPlayerDetail
            })
        )
})
