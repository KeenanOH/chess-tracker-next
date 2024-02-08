import { z } from "zod"

import { Match, selectMatch } from "@/lib/trpc/models/match"
import { Player, selectPlayer } from "@/lib/trpc/models/player"
import { School } from "@/lib/trpc/models/school"

export const SchoolDetail = School.extend({
    homeMatches: z.array(Match),
    awayMatches: z.array(Match),
    players: z.array(Player)
})

export type SchoolDetail = z.infer<typeof SchoolDetail>

export const selectSchoolDetail = {
    id: true,
    name: true,
    homeMatches: {
        select: selectMatch
    },
    awayMatches: {
        select: selectMatch
    },
    players: {
        select: selectPlayer
    }
}
