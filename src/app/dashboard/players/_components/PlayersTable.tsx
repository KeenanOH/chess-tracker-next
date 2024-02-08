import { Td } from "@chakra-ui/react"
import { z } from "zod"

import TableList from "@/app/_components/table/TableList"
import { Player } from "@/lib/trpc/models/player"

export default function PlayersTable({ players }: { players: z.infer<typeof Player>[] }) {
    return (
        <TableList header="Players">
            { players.map(player =>
                <Td key={ player.id }>
                    { player.firstName } vs. { player.lastName }
                </Td>
            )}
        </TableList>
    )
}
