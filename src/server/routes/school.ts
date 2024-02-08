import { TRPCError } from "@trpc/server"
import { z } from "zod"

import { School, selectSchool } from "@/lib/trpc/models/school"
import { SchoolDetail, selectSchoolDetail } from "@/lib/trpc/models/schoolDetail"
import { authenticatedProcedure, publicProcedure, router } from "@/server/trpc"

export const schoolRouter = router({
    create: authenticatedProcedure
        .input(z.object({
            name: z.string()
        }))
        .output(School)
        .mutation(async ({ ctx, input }) => {
            if (!ctx.user.admin)
                throw new TRPCError({ code: "UNAUTHORIZED" })

            return ctx.prisma.school.create({
                data: input,
                select: selectSchool
            })
        }),
    getAll: publicProcedure
        .output(z.array(School))
        .query(({ ctx }) =>
            ctx.prisma.school.findMany({
                select: selectSchool
            })
        ),
    get: publicProcedure
        .input(z.object({
            id: z.string()
        }))
        .output(z.nullable(SchoolDetail))
        .query(({ ctx, input }) =>
            ctx.prisma.school.findFirst({
                where: input,
                select: selectSchoolDetail
            })
        ),
    update: authenticatedProcedure
        .input(z.object({
            id: z.string(),
            name: z.string()
        }))
        .output(School)
        .mutation(({ ctx, input }) => {
            if (!ctx.user.admin)
                throw new TRPCError({ code: "UNAUTHORIZED" })

            return ctx.prisma.school.update({
                data: {
                    name: input.name
                },
                where: {
                    id: input.id
                },
                select: selectSchool
            })
        }),
    delete: authenticatedProcedure
        .input(z.object({
            id: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            if (!ctx.user.admin)
                throw new TRPCError({ code: "UNAUTHORIZED" })

            await ctx.prisma.school.delete({
                where: input
            })
        }),
    deleteMany: authenticatedProcedure
        .input(z.object({
            schoolIds: z.array(z.string())
        }))
        .mutation(async ({ ctx, input }) => {
            if (!ctx.user.admin)
                throw new TRPCError({ code: "UNAUTHORIZED" })

            await ctx.prisma.school.deleteMany({
                where: {
                    id: {
                        in: input.schoolIds
                    }
                }
            })
        })
})
