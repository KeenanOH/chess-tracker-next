"use client"

import { SimpleGrid, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"

import BoardModal from "@/app/_components/boards/BoardModal"
import BoardSummary from "@/app/_components/boards/BoardSummary"
import { Board } from "@/lib/trpc/models/board"
import { MatchDetail } from "@/lib/trpc/models/matchDetail"
import { Player } from "@/lib/trpc/models/player"

export default function BoardGrid({ match, homePlayers, awayPlayers, boardsEditable = true }: { match: MatchDetail, homePlayers: Player[], awayPlayers: Player[], boardsEditable?: boolean }) {

    const boardModal = useDisclosure()
    const [currentBoard, setCurrentBoard] = useState<Board>()

    function openBoardModal(board: Board) {
        setCurrentBoard(board)
        boardModal.onOpen()
    }

    return (
        <>
            <SimpleGrid columns={ [1, null, null, 2] } gap="32px">
                { match.boards.map(board =>
                    <div key={ board.id } onClick={ () => openBoardModal(board) }>
                        <BoardSummary board={ board }/>
                    </div>
                ) }
            </SimpleGrid>

            { currentBoard && boardsEditable &&
                <BoardModal isOpen={ boardModal.isOpen } onClose={ boardModal.onClose } board={ currentBoard } homePlayers={ homePlayers } awayPlayers={ awayPlayers } />
            }
        </>
    )
}
