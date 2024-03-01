import { z } from "zod"

import { School, selectSchool } from "@/lib/trpc/models/school"
import { SchoolDetail, selectSchoolDetail } from "@/lib/trpc/models/schoolDetail"
import { adminProcedure, publicProcedure, router } from "@/server/trpc"

export const schoolRouter = router({
    createSchool: adminProcedure
        .input(z.object({
            name: z.string()
        }))
        .output(School)
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.school.create({
                data: input,
                select: selectSchool
            })
        }),
    getSchools: publicProcedure
        .output(z.array(School))
        .query(async ({ ctx }) => {
            return await ctx.prisma.school.findMany({
                select: selectSchool
            })
        }),
    getSchool: publicProcedure
        .input(z.object({
            id: z.string()
        }))
        .output(z.nullable(SchoolDetail))
        .query(async ({ ctx, input }) => {
            return await ctx.prisma.school.findFirst({
                where: input,
                select: selectSchoolDetail
            })
        }),
    updateSchool: adminProcedure
        .input(z.object({
            id: z.string(),
            name: z.string()
        }))
        .output(School)
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.school.update({
                data: {
                    name: input.name
                },
                where: {
                    id: input.id
                },
                select: selectSchool
            })
        }),
    deleteSchools: adminProcedure
        .input(z.object({
            ids: z.array(z.string())
        }))
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.school.deleteMany({
                where: {
                    id: {
                        in: input.ids
                    }
                }
            })
        })
})
