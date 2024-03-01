import { getServerSession } from "next-auth"

import { nextAuthOptions } from "@/lib/nextAuth"
import { prisma } from "@/lib/prisma"
import { appRouter } from "@/server/appRouter"
import { createCallerFactory } from "@/server/trpc"

export const createCaller = createCallerFactory(appRouter)

export async function getUser() {
    const session = await getServerSession(nextAuthOptions)

    return session?.user && await prisma.user.findFirst({
        where: {
            email: session.user.email
        }
    })
}

export async function getCaller() {
    const user = await getUser()

    const context = { user, prisma }
    return {
        caller: createCaller(context),
        user
    }
}
