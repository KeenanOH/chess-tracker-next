import { Box, Heading } from "@chakra-ui/react"

import PlayersTable from "@/app/dashboard/players/_components/PlayersTable"
import { Player } from "@/lib/trpc/models/player"
import { getCaller } from "@/server/caller"

export default async function DashboardPlayers() {

    const { caller, user } = await getCaller()

    let players: Player[]

    if (user?.schoolId)
        players = await caller.getPlayers({ schoolId: user.schoolId })
    else
        players = []

    return (
        <Box>
            <Heading size="xl" paddingBottom="16px">Schools</Heading>
            <PlayersTable players={ players } />
        </Box>
    )
}
