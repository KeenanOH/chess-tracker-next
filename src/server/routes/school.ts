import { z } from "zod"

import { authenticatedProcedure, publicProcedure, router } from "@/server/trpc"
import { TRPCError } from "@trpc/server"

export const schoolRouter = router({
    create: authenticatedProcedure
        .input(z.object({
            name: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            if (!ctx.user.admin)
                throw new TRPCError({ code: "UNAUTHORIZED" })

            return ctx.prisma.school.create({
                data: input
            })
        }),
    getAll: publicProcedure
        .query(({ ctx }) =>
            ctx.prisma.school.findMany({
                select: {
                    id: true,
                    name: true
                }
            })
        ),
    get: publicProcedure
        .input(z.object({
            id: z.string()
        }))
        .query(({ ctx, input }) =>
            ctx.prisma.school.findFirst({
                where: input,
                select: {
                    id: true,
                    name: true,
                    homeMatches: true,
                    awayMatches: true
                }
            })
        ),
    update: authenticatedProcedure
        .input(z.object({
            id: z.string(),
            name: z.string()
        }))
        .query(({ ctx, input }) => {
            if (!ctx.user.admin)
                throw new TRPCError({ code: "UNAUTHORIZED" })

            return ctx.prisma.school.update({
                data: {
                    name: input.name
                },
                where: {
                    id: input.id
                }
            })
        }),
    delete: authenticatedProcedure
        .input(z.object({
            id: z.string()
        }))
        .query(({ ctx, input }) => {
            if (!ctx.user.admin)
                throw new TRPCError({ code: "UNAUTHORIZED" })

            return ctx.prisma.school.delete({
                where: input
            })
        })
})
