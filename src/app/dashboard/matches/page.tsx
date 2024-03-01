import { Box, Heading } from "@chakra-ui/react"

import MatchesTable from "@/app/_components/table/MatchesTable"
import { Match } from "@/lib/trpc/models/match"
import { getCaller } from "@/server/caller"

export default async function DashboardMatches() {

    const { caller, user } = await getCaller()

    let matches: Match[]

    if (user?.schoolId)
        matches = await caller.getMatches({ schoolId: user?.schoolId ?? undefined })
    else
        matches = []

    return (
        <Box>
            <Heading size="xl" paddingBottom="16px">Schools</Heading>
            <MatchesTable matches={ matches } />
        </Box>
    )
}
