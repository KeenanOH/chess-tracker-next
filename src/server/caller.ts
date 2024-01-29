import { createCallerFactory } from "@/server/trpc"
import { appRouter } from "@/server/appRouter"

export const createCaller = createCallerFactory(appRouter)
