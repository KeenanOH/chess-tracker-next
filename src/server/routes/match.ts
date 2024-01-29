import { z } from "zod"

import { authenticatedProcedure, publicProcedure, router } from "@/server/trpc"
import { TRPCError } from "@trpc/server"

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

            return ctx.prisma.match.create({
                data: input
            })
        }),
    update: authenticatedProcedure
        .input(z.object({
            id: z.string(),
            date: z.optional(z.date()),
            homeSchoolId: z.optional(z.string()),
            awaySchoolId: z.optional(z.string())
        }))
        .mutation(async ({ ctx, input }) => {
            if (!ctx.user.admin)
                throw new TRPCError({ code: "UNAUTHORIZED" })

            return ctx.prisma.match.update({
                data: {
                    date: input.date,
                    homeSchoolId: input.homeSchoolId,
                    awaySchoolId: input.awaySchoolId
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
        .mutation(async ({ ctx, input }) => {
            if (!ctx.user.admin)
                throw new TRPCError({ code: "UNAUTHORIZED" })

            return ctx.prisma.match.delete({
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
        .query(async ({ ctx, input }) =>
            ctx.prisma.match.findMany({
                where: input
            })
        ),
    get: publicProcedure
        .input(z.object({
            id: z.string()
        }))
        .query(({ ctx, input }) =>
            ctx.prisma.match.findFirst({
                where: input,
                select: {
                    id: true,
                    date: true,
                    published: true,
                    homeSchool: true,
                    awaySchool: true,
                    boards: true
                }
            })
        )
})
