import { Input, Select } from "@chakra-ui/react"
import { useState } from "react"

import ActionModal from "@/app/_components/modals/ActionModal"
import { ModalProps } from "@/app/types"
import { School } from "@/lib/trpc/models/school"
import { trpc } from "@/lib/trpc/trpc"

export default function CreatePlayerModal({ isOpen, onClose, schools }: ModalProps & { schools: School[] }) {

    const createPlayerMutation = trpc.createPlayer.useMutation()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [schoolId, setSchoolId] = useState("")

    return (
        <ActionModal
            action={ () => createPlayerMutation.mutateAsync({ firstName, lastName, schoolId }) }
            isOpen={ isOpen }
            onClose={ onClose }
            header="Create Player"
            buttonText="Create"
            successMessage="Created Player"
        >
            <Input placeholder="First Name" onChange={ e => setFirstName(e.target.value) } />
            <Input placeholder="Last Name" onChange={ e => setLastName(e.target.value) }/>
            <Select placeholder="School" onChange={ e => setSchoolId(e.target.value) }>
                { schools.map(school =>
                    <option key={ school.id } value={ school.id }>{ school.name }</option>
                ) }
            </Select>
        </ActionModal>
    )
}
