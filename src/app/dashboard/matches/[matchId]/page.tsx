import { Box, Heading } from "@chakra-ui/react"
import { notFound } from "next/navigation"

import BoardGrid from "@/app/_components/boards/BoardGrid"
import { getCaller } from "@/server/caller"

function getScore(result: string, number: number, winResult: string) {
    const baseScore = 12 - (number - 1)

    if (result === winResult)
        return baseScore
    else if (result === "draw")
        return baseScore * 0.5

    return 0
}

export default async function MatchPage({ params }: { params: { matchId: string } }) {

    const { caller } = await getCaller()
    const match = await caller.getMatchDetail({ id: params.matchId })

    if (!match) {
        notFound()
    }

    const homePlayers = await caller.getPlayers({ schoolId: match.homeSchool.id })
    const awayPlayers = await caller.getPlayers({ schoolId: match.awaySchool.id })

    const homeScore = match.boards
        .map(board => getScore(board.result, board.number, "home"))
        .reduce((accumulator, value) => value + accumulator)
    const awayScore = match.boards
        .map(board => getScore(board.result, board.number, "away"))
        .reduce((accumulator, value) => value + accumulator)

    return (
        <Box>
            <Heading size="lg" paddingBottom="16px">{ match.homeSchool.name } ({ homeScore }) vs. { match.awaySchool.name } ({ awayScore })</Heading>
            <BoardGrid match={ match } homePlayers={ homePlayers } awayPlayers={ awayPlayers } />
        </Box>
    )
}
