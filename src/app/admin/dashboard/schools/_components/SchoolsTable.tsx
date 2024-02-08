"use client"

import { Td, useDisclosure, useToast } from "@chakra-ui/react"
import { useState } from "react"

import CheckableTable from "@/app/_components/table/CheckableTable"
import CreateSchoolModal from "@/app/admin/dashboard/schools/_components/CreateSchoolModal"
import DeleteSchoolModal from "@/app/admin/dashboard/schools/_components/DeleteSchoolModal"
import UpdateSchoolModal from "@/app/admin/dashboard/schools/_components/UpdateSchoolModal"
import { School } from "@/lib/trpc/models/school"

export default function SchoolsTable({ schools }: { schools: School[] }) {

    const createSchoolModal = useDisclosure()
    const deleteSchoolModal = useDisclosure()
    const updateSchoolModal = useDisclosure()
    const toast = useToast()
    const [schoolIds, setSchoolIds] = useState<string[]>([])
    const [school, setSchool] = useState<School>()

    function openDeleteSchoolModal(schools: School[]) {
        setSchoolIds(schools.map(school => school.id))
        deleteSchoolModal.onOpen()
    }

    function openUpdateSchoolModal(schools: School[]) {
        if (schools.length != 1) {
            toast({ title: "Error", description: "Please select 1 school.", status: "error" })
            return
        }

        setSchool(schools[0])
        updateSchoolModal.onOpen()
    }

    return (
        <>
            <CheckableTable
                headers={ ["Name"] }
                data={ schools }
                getRow={ data =>
                    <Td>{ data.name }</Td>
                }
                menuActions={ [
                    { name: "Create School", callback: createSchoolModal.onOpen },
                    { name: "Delete School(s)", callback: openDeleteSchoolModal },
                    { name: "Update School", callback: openUpdateSchoolModal }
                ] }
            />

            <CreateSchoolModal isOpen={ createSchoolModal.isOpen } onClose={ createSchoolModal.onClose } />
            <DeleteSchoolModal isOpen={ deleteSchoolModal.isOpen } onClose={ deleteSchoolModal.onClose } schoolIds={ schoolIds } />
            { school &&
                <UpdateSchoolModal isOpen={ updateSchoolModal.isOpen } onClose={ updateSchoolModal.onClose } school={ school } />
            }
        </>
    )
}
