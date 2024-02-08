import { Box, Heading } from "@chakra-ui/react"

import MatchesTable from "@/app/admin/dashboard/matches/_components/MatchesTable"
import { getCaller } from "@/server/caller"

export default async function AdminDashboardMatches() {

    const caller = await getCaller()
    const matches = await caller.match.getAll()
    const schools = await caller.school.getAll()

    return (
        <Box>
            <Heading size="xl" paddingBottom="16px">Matches</Heading>
            <MatchesTable matches={ matches } schools={ schools } />
        </Box>
    )
}
