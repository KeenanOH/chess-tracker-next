import { Box, Flex, Heading } from "@chakra-ui/react"

import MatchesTable from "@/app/_components/table/MatchesTable"
import { getCaller } from "@/server/caller"

export default async function SortedMatchesPage() {

    const { caller } = await getCaller()
    const groups = await caller.getMatchesByDate()

    return (
        <Box>
            <Heading size="xl" paddingBottom="16px">Matches</Heading>

            <Flex flexDirection="column" gap="32px">
                { groups.map(group =>
                    <Box key={ group.date.toDateString() }>
                        <Heading size="md" paddingBottom="16px">{ group.date.toDateString() }</Heading>
                        <MatchesTable matches={ group.matches } />
                    </Box>
                ) }
            </Flex>
        </Box>
    )
}
