import { Box, Heading } from "@chakra-ui/react"
import { getCaller } from "@/server/caller"
import PlayersTable from "@/app/admin/dashboard/players/_components/PlayersTable"

export default async function AdminDashboardPlayers() {

    const caller = await getCaller()
    const players = await caller.player.getAll()
    const schools = await caller.school.getAll()

    return (
        <Box>
            <Heading size="xl" paddingBottom="16px">Players</Heading>
            <PlayersTable players={ players } schools={ schools } />
        </Box>
    )
}
