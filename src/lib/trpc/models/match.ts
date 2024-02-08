import { z } from "zod"

import { School, selectSchool } from "@/lib/trpc/models/school"

export const Match = z.object({
    id: z.string(),
    date: z.date(),
    homeSchool: School,
    awaySchool: School,
    published: z.boolean()
})

export type Match = z.infer<typeof Match>

export const selectMatch = {
    id: true,
    date: true,
    homeSchool: {
        select: selectSchool
    },
    awaySchool: {
        select: selectSchool
    },
    published: true
}
