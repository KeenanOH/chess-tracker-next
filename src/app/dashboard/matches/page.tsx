import { Box, Heading } from "@chakra-ui/react"

import MatchesTable from "@/app/dashboard/matches/_components/MatchesTable"
import { getCaller } from "@/server/caller"

export default async function DashboardMatches() {

    const caller = await getCaller()
    const matches = await caller.match.getAll()

    return (
        <Box>
            <Heading size="xl" paddingBottom="16px">Schools</Heading>
            <MatchesTable matches={ matches } />
        </Box>
    )
}