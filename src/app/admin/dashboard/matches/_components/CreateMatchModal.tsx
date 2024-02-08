import { Select } from "@chakra-ui/react"
import { SingleDatepicker } from "chakra-dayzed-datepicker"
import { useState } from "react"

import ActionModal from "@/app/_components/modals/ActionModal"
import { ModalProps } from "@/app/types"
import { School } from "@/lib/trpc/models/school"
import { trpc } from "@/lib/trpc/trpc"

export default function CreateMatchModal({ isOpen, onClose, schools }: ModalProps & { schools: School[] }) {

    const createMatchMutation = trpc.match.create.useMutation()
    const [date, setDate] = useState(new Date())
    const [homeSchoolId, setHomeSchoolId] = useState("")
    const [awaySchoolId, setAwaySchoolId] = useState("")

    return (
        <ActionModal
            action={ () => createMatchMutation.mutateAsync({ date: date, homeSchoolId, awaySchoolId })}
            isOpen={ isOpen }
            onClose={ onClose }
            header="Create Match"
            buttonText="Create"
            successMessage="Created match"
        >
            <SingleDatepicker
                name="Date"
                date={date}
                onDateChange={setDate}
            />
            <Select placeholder="Home School" onChange={ e => setHomeSchoolId(e.target.value) }>
                { schools.map(school =>
                    <option key={ school.id } value={ school.id }>{ school.name }</option>
                ) }
            </Select>
            <Select placeholder="Away School" onChange={ e => setAwaySchoolId(e.target.value) }>
                { schools.map(school =>
                    <option key={ school.id } value={ school.id }>{ school.name }</option>
                ) }
            </Select>
        </ActionModal>
    )
}
