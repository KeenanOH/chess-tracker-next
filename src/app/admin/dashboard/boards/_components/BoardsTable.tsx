"use client"

import { Td, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"

import CheckableTable from "@/app/_components/table/CheckableTable"
import CreateBoardModal from "@/app/admin/dashboard/boards/_components/CreateBoardModal"
import DeleteBoardModal from "@/app/admin/dashboard/boards/_components/DeleteBoardModal"
import { Board } from "@/lib/trpc/models/board"
import { Match } from "@/lib/trpc/models/match"

export default function BoardsTable({ boards, matches }: { boards: Board[], matches: Match[] }) {

    const addBoardModal = useDisclosure()
    const deleteBoardModal = useDisclosure()
    const [boardIds, setBoardIds] = useState<string[]>([])

    function openBoardModal(boards: Board[]) {
        setBoardIds(boards.map(board => board.id))
        deleteBoardModal.onOpen()
    }

    return (
        <>
            <CheckableTable
                headers={ ["Home Player", "Away Player", "Number"] }
                data={ boards }
                getRow={ board =>
                    <>
                        <Td>{ board.homePlayer?.firstName ?? "-" } { board.homePlayer?.lastName ?? "-" }</Td>
                        <Td>{ board.awayPlayer?.firstName ?? "-" } { board.awayPlayer?.lastName ?? "-" }</Td>
                        <Td>{ board.number }</Td>
                    </>
                }
                menuActions={ [
                    { name: "Add Board", callback: addBoardModal.onOpen },
                    { name: "Delete Board(s)", callback: openBoardModal }
                ] }
            />

            <CreateBoardModal isOpen={ addBoardModal.isOpen } onClose={ addBoardModal.onClose } matches={ matches } />
            <DeleteBoardModal isOpen={ deleteBoardModal.isOpen } onClose={ deleteBoardModal.onClose } boardIds={ boardIds } />
        </>
    )
}
