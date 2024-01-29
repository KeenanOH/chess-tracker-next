import { getServerSession } from "next-auth"

import { nextAuthOptions } from "@/lib/nextAuth"
import { prisma } from "@/lib/prisma"

export async function createContext() {
    const session = await getServerSession(nextAuthOptions)

    const user = session?.user && await prisma.user.findFirst({
        where: {
            email: session.user.email
        }
    })

    return { user, prisma }
}

export type Context = Awaited<ReturnType<typeof createContext>>
