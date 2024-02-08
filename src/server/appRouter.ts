import { boardRouter } from "@/server/routes/board"
import { matchRouter } from "@/server/routes/match"
import { playerRouter } from "@/server/routes/player"
import { schoolRouter } from "@/server/routes/school"
import { statsRouter } from "@/server/routes/stats"
import { userRouter } from "@/server/routes/user"
import { router } from "@/server/trpc"

export const appRouter = router({
    board: boardRouter,
    match: matchRouter,
    player: playerRouter,
    school: schoolRouter,
    user: userRouter,
    stats: statsRouter
})
export type AppRouter = typeof appRouter
