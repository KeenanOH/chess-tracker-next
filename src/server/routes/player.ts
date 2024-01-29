import { z } from "zod"

import { authenticatedProcedure, publicProcedure, router } from "@/server/trpc"
import { TRPCError } from "@trpc/server"

export const playerRouter = router({
    create: authenticatedProcedure
        .input(z.object({
            firstName: z.string(),
            lastName: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            if (!ctx.user.schoolId)
                throw new TRPCError({ code: "FORBIDDEN" })

            return ctx.prisma.player.create({
                data: {
                    ...input,
                    schoolId: ctx.user.schoolId
                }
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

            return ctx.prisma.player.delete({
                where: {
                    id: input.id,
                    schoolId: ctx.user.schoolId
                }
            })
        }),
    update: authenticatedProcedure
        .input(z.object({
            id: z.string(),
            firstName: z.optional(z.string()),
            lastName: z.optional(z.string())
        }))
        .mutation(async ({ ctx, input }) => {
            if (ctx.user.admin)
                return ctx.prisma.player.update({
                    data: {
                        firstName: input.firstName,
                        lastName: input.lastName
                    },
                    where: {
                        id: input.id
                    }
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
                }
            })
        }),
    getAll: publicProcedure
        .input(z.object({
            schoolId: z.string()
        }))
        .query(async ({ ctx, input }) =>
            ctx.prisma.player.findMany({
                where: input
            })
        ),
    get: publicProcedure
        .input(z.object({
            id: z.string()
        }))
        .query(async ({ ctx, input }) =>
            ctx.prisma.player.findFirst({
                where: input,
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    homeBoards: true,
                    awayBoards: true
                }
            })
        )
})
