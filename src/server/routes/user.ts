import { TRPCError } from "@trpc/server"
import { z } from "zod"

import { authenticatedProcedure, router } from "@/server/trpc"

export const userRouter = router({
    updateUser: authenticatedProcedure
        .input(z.object({
            secretCode: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            const school = await ctx.prisma.school.findFirst({
                where: input
            })

            if (!school)
                throw new TRPCError({ code: "BAD_REQUEST" })

            await ctx.prisma.user.update({
                data: {
                    schoolId: school.id
                },
                where: {
                    id: ctx.user.id
                }
            })
        })
})
