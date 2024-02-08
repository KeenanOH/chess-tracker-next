import { Box, Heading } from "@chakra-ui/react"

import PlayersTable from "@/app/dashboard/players/_components/PlayersTable"
import { getCaller } from "@/server/caller"

export default async function DashboardPlayers() {

    const caller = await getCaller()
    const players = await caller.player.getAll()

    return (
        <Box>
            <Heading size="xl" paddingBottom="16px">Schools</Heading>
            <PlayersTable players={ players } />
        </Box>
    )
}
