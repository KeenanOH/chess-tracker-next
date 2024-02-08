"use client"

import { Td, useDisclosure, useToast } from "@chakra-ui/react"
import { useState } from "react"

import CheckableTable from "@/app/_components/table/CheckableTable"
import CreateMatchModal from "@/app/admin/dashboard/matches/_components/CreateMatchModal"
import { Match } from "@/lib/trpc/models/match"
import { School } from "@/lib/trpc/models/school"

import DeleteMatchModal from "./DeleteMatchModal"
import UpdateMatchModal from "./UpdateMatchModal"

export default function MatchesTable({ matches, schools }: { matches: Match[], schools: School[] }) {


    const toast = useToast()
    const createMatchModal = useDisclosure()
    const deleteMatchModal = useDisclosure()
    const updateMatchModal = useDisclosure()

    const [matchIds, setMatchIds] = useState<string[]>([])
    const [match, setMatch ] = useState<Match>()

    function openDeleteMatchModal(matches: Match[]) {
        setMatchIds(matches.map(match => match.id))
        deleteMatchModal.onOpen()
    }

    function openUpdateMatchModal(matches: Match[]) {
        if (matches.length != 1) {
            toast({ title: "Error", description: "Please select 1 match.", status: "error" })
            return
        }

        setMatch(matches[0])
        updateMatchModal.onOpen()
    }

    return (
        <>
            <CheckableTable
                headers={ ["Home School", "Away School", "Date", "Published"] }
                data={ matches }
                getRow={ data =>
                    <>
                        <Td>{ data.homeSchool.name }</Td>
                        <Td>{ data.awaySchool.name }</Td>
                        <Td>{ new Date(data.date).toDateString() }</Td>
                        <Td>{ data.published ? "True" : "False" }</Td>
                    </>
                }
                menuActions={ [
                    { name: "Create Match", callback: createMatchModal.onOpen },
                    { name: "Delete Match(es)", callback: openDeleteMatchModal },
                    { name: "Update Match", callback: openUpdateMatchModal }
                ] }
            />

            <CreateMatchModal isOpen={ createMatchModal.isOpen } onClose={ createMatchModal.onClose } schools={ schools } />
            <DeleteMatchModal isOpen={ deleteMatchModal.isOpen } onClose={ deleteMatchModal.onClose } matchIds={ matchIds } />
            { match &&
                <UpdateMatchModal isOpen={ updateMatchModal.isOpen } onClose={ updateMatchModal.onClose } match={ match } schools={ schools } />
            }
        </>
    )
}
