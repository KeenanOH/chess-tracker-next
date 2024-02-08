import { Td } from "@chakra-ui/react"
import { z } from "zod"

import TableList from "@/app/_components/table/TableList"
import { Match } from "@/lib/trpc/models/match"

export default function MatchesTable({ matches }: { matches: z.infer<typeof Match>[] }) {
    return (
        <TableList header="Matches">
            { matches.map(match =>
                <Td key={ match.id }>
                    { match.homeSchool.name } vs. { match.awaySchool.name }
                </Td>
            )}
        </TableList>
    )
}
