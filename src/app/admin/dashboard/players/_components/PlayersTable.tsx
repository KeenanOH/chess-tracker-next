"use client"

import { Td, useDisclosure, useToast } from "@chakra-ui/react"
import { useState } from "react"

import CheckableTable from "@/app/_components/table/CheckableTable"
import CreatePlayerModal from "@/app/admin/dashboard/players/_components/CreatePlayerModal"
import DeletePlayerModal from "@/app/admin/dashboard/players/_components/DeletePlayerModal"
import UpdatePlayerModal from "@/app/admin/dashboard/players/_components/UpdatePlayerModal"
import { Player } from "@/lib/trpc/models/player"
import { School } from "@/lib/trpc/models/school"

export default function PlayersTable({ players, schools }: { players: Player[], schools: School[] }) {

    const toast = useToast()
    const createPlayerModal = useDisclosure()
    const deletePlayerModal = useDisclosure()
    const updatePlayerModal = useDisclosure()

    const [playerIds, setPlayerIds] = useState<string[]>([])
    const [player, setPlayer ] = useState<Player>()

    function openDeletePlayerModal(players: Player[]) {
        setPlayerIds(players.map(player => player.id))
        deletePlayerModal.onOpen()
    }

    function openUpdatePlayerModal(players: Player[]) {
        if (players.length != 1) {
            toast({ title: "Error", description: "Please select 1 player.", status: "error" })
            return
        }

        setPlayer(players[0])
        updatePlayerModal.onOpen()
    }

    return (
        <>
            <CheckableTable
                headers={ ["School", "First Name", "Last Name"] }
                data={ players }
                getRow={ data =>
                    <>
                        <Td>{ data.school.name }</Td>
                        <Td>{ data.firstName }</Td>
                        <Td>{ data.lastName }</Td>
                    </>
                }
                menuActions={ [
                    { name: "Create Player", callback: createPlayerModal.onOpen },
                    { name: "Delete Player(s)", callback: openDeletePlayerModal },
                    { name: "Update Player", callback: openUpdatePlayerModal }
                ] }
            />

            <CreatePlayerModal isOpen={ createPlayerModal.isOpen } onClose={ createPlayerModal.onClose } schools={ schools } />
            <DeletePlayerModal isOpen={ deletePlayerModal.isOpen } onClose={ deletePlayerModal.onClose } playerIds={ playerIds } />
            { player &&
                <UpdatePlayerModal isOpen={ updatePlayerModal.isOpen } onClose={ updatePlayerModal.onClose } player={ player } schools={ schools } />
            }
        </>
    )
}
