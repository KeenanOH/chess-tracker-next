import { Box, Heading } from "@chakra-ui/react"

import BoardsTable from "@/app/admin/dashboard/boards/_components/BoardsTable"
import { getCaller } from "@/server/caller"

export default async function AdminDashboardBoards() {

    const caller = await getCaller()
    const matches = await caller.match.getAll()
    const boards = await caller.board.getAll()

    return (
        <Box>
            <Heading size="xl" paddingBottom="16px">Boards</Heading>
            <BoardsTable boards={ boards } matches={ matches } />
        </Box>
    )
}
