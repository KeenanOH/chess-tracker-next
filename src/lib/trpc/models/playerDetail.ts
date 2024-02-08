import { z } from "zod"

import { Board, selectBoard } from "@/lib/trpc/models/board"
import { Player } from "@/lib/trpc/models/player"
import { selectSchool } from "@/lib/trpc/models/school"

export const PlayerDetail = Player.extend({
    homeBoards: z.array(Board),
    awayBoards: z.array(Board)
})

export type PlayerDetail = z.infer<typeof PlayerDetail>

export const selectPlayerDetail = {
    id: true,
    firstName: true,
    lastName: true,
    school: {
        select: selectSchool
    },
    homeBoards: {
        select: selectBoard
    },
    awayBoards: {
        select: selectBoard
    }
}
