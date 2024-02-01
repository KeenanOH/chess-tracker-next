import { createCallerFactory } from "@/server/trpc"
import { appRouter } from "@/server/appRouter"
import { getServerSession } from "next-auth"
import { nextAuthOptions } from "@/lib/nextAuth"
import { prisma } from "@/lib/prisma"

export const createCaller = createCallerFactory(appRouter)

export async function getCaller() {
    const session = await getServerSession(nextAuthOptions)

    const user = session?.user && await prisma.user.findFirst({
        where: {
            email: session.user.email
        }
    })

    return createCaller({ user, prisma })
}
