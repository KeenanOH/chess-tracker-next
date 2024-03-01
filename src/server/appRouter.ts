import { boardRouter } from "@/server/routes/board"
import { matchRouter } from "@/server/routes/match"
import { playerRouter } from "@/server/routes/player"
import { schoolRouter } from "@/server/routes/school"
import { statsRouter } from "@/server/routes/stats"
import { userRouter } from "@/server/routes/user"
import { mergeRouters } from "@/server/trpc"

export const appRouter = mergeRouters(
    boardRouter,
    matchRouter,
    playerRouter,
    schoolRouter,
    userRouter,
    statsRouter
)

export type AppRouter = typeof appRouter
