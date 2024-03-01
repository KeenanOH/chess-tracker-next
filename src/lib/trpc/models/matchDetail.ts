import { z } from "zod"

import { Board, selectBoard } from "@/lib/trpc/models/board"
import { School, selectSchool } from "@/lib/trpc/models/school"

export const MatchDetail = z.object({
    id: z.string(),
    date: z.date(),
    homeSchool: School,
    awaySchool: School,
    published: z.boolean(),
    boards: z.array(Board),
    homeScore: z.number(),
    awayScore: z.number()
})

export type MatchDetail = z.infer<typeof MatchDetail>

export const selectMatchDetail = {
    id: true,
    date: true,
    homeSchool: {
        select: selectSchool
    },
    awaySchool: {
        select: selectSchool
    },
    published: true,
    boards: {
        select: selectBoard,
        orderBy: {
            number: "asc"
        }
    }
}
