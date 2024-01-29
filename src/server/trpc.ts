import { initTRPC, TRPCError } from "@trpc/server"

import { Context } from "@/server/context"

const t = initTRPC.context<Context>().create()
export const router = t.router
export const publicProcedure = t.procedure
export const authenticatedProcedure = t.procedure.use(async (opts) => {
    const { user } = opts.ctx

    if (!user)
        throw new TRPCError({ code: "UNAUTHORIZED" })

    return opts.next({
        ctx: {
            user
        }
    })
})
export const createCallerFactory = t.createCallerFactory