import { z } from "zod"

import { School, selectSchool } from "@/lib/trpc/models/school"

export const Player = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    school: School
})

export type Player = z.infer<typeof Player>

export const selectPlayer = {
    id: true,
    firstName: true,
    lastName: true,
    school: {
        select: selectSchool
    }
}
