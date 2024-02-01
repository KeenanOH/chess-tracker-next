"use client"

import { School } from "@/app/types"
import CheckableTable from "@/app/_components/table/CheckableTable"
import { Td, useDisclosure, useToast } from "@chakra-ui/react"
import AddSchoolsModal from "@/app/admin/dashboard/schools/_components/AddSchoolsModal"
import DeleteSchoolModal from "@/app/admin/dashboard/schools/_components/DeleteSchoolModal"
import { useState } from "react"
import UpdateSchoolsModal from "@/app/admin/dashboard/schools/_components/UpdateSchoolModal"

export default function SchoolsTable({ schools }: { schools: School[] }) {

    const addSchoolModalDisclosure = useDisclosure()
    const deleteSchoolModalDisclosure = useDisclosure()
    const updateSchoolModalDisclosure = useDisclosure()
    const toast = useToast()

    const [schoolIds, setSchoolIds] = useState<string[]>([])
    const [school, setSchool] = useState<School>()

    function openDeleteSchoolModal(schools: School[]) {
        setSchoolIds(schools.map(school => school.id))
        deleteSchoolModalDisclosure.onOpen()
    }

    function openUpdateSchoolModal(schools: School[]) {
        if (schools.length != 1) {
            toast({ title: "Error", description: "Please select 1 school.", status: "error" })
            return
        }

        setSchool(schools[0])
        updateSchoolModalDisclosure.onOpen()
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
                    { name: "Add School", callback: addSchoolModalDisclosure.onOpen },
                    { name: "Delete School(s)", callback: openDeleteSchoolModal },
                    { name: "Update School", callback: openUpdateSchoolModal }
                ] }
            />

            <AddSchoolsModal isOpen={ addSchoolModalDisclosure.isOpen } onClose={ addSchoolModalDisclosure.onClose } />
            <DeleteSchoolModal isOpen={ deleteSchoolModalDisclosure.isOpen } onClose={ deleteSchoolModalDisclosure.onClose } schoolIds={ schoolIds } />
            { school &&
                <UpdateSchoolsModal isOpen={ updateSchoolModalDisclosure.isOpen } onClose={ updateSchoolModalDisclosure.onClose } school={ school } />
            }
        </>
    )
}
