import { router } from "@/server/trpc"
import { boardRouter } from "@/server/routes/board"
import { matchRouter } from "@/server/routes/match"
import { playerRouter } from "@/server/routes/player"
import { schoolRouter } from "@/server/routes/school"
import { userRouter } from "@/server/routes/user"

export const appRouter = router({
    board: boardRouter,
    match: matchRouter,
    player: playerRouter,
    school: schoolRouter,
    user: userRouter
})
export type AppRouter = typeof appRouter
