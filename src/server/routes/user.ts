import { TRPCError } from "@trpc/server"
import { z } from "zod"

import { authenticatedProcedure, router } from "@/server/trpc"

export const userRouter = router({
    update: authenticatedProcedure
        .input(z.object({
            schoolCode: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            const school = await ctx.prisma.school.findFirst({
                where: {
                    secretCode: input.schoolCode
                }
            })

            if (!school)
                throw new TRPCError({ code: "BAD_REQUEST" })

            return ctx.prisma.user.update({
                data: {
                    schoolId: school.id
                },
                where: {
                    id: ctx.user.id
                }
            })
        })
})
