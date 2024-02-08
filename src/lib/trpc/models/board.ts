import { z } from "zod"

import { Player, selectPlayer } from "@/lib/trpc/models/player"

export const Board = z.object({
    id: z.string(),
    number: z.number().min(1).max(8),
    homePlayer: z.nullable(Player),
    awayPlayer: z.nullable(Player),
    result: z.string()
})

export type Board = z.infer<typeof Board>

export const selectBoard = {
    id: true,
    number: true,
    homePlayer: {
        select: selectPlayer
    },
    awayPlayer: {
        select: selectPlayer
    },
    result: true
}
