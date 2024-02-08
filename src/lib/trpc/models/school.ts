import { z } from "zod"

export const School = z.object({
    id: z.string(),
    name: z.string()
})

export type School = z.infer<typeof School>

export const selectSchool = {
    id: true,
    name: true
}
