import { Input, Select } from "@chakra-ui/react"
import { useState } from "react"

import ActionModal from "@/app/_components/modals/ActionModal"
import { ModalProps } from "@/app/types"
import { Player } from "@/lib/trpc/models/player"
import { School } from "@/lib/trpc/models/school"
import { trpc } from "@/lib/trpc/trpc"

export default function UpdatePlayerModal({ isOpen, onClose, player, schools }: ModalProps & { player: Player, schools: School[] }) {

    const updatePlayerMutation = trpc.player.update.useMutation()
    const [firstName, setFirstName] = useState(player.firstName)
    const [lastName, setLastName] = useState(player.lastName)
    const [schoolId, setSchoolId] = useState(player.school.id)

    return (
        <ActionModal
            action={ () => updatePlayerMutation.mutateAsync({ id: player.id, firstName, lastName, schoolId }) }
            isOpen={ isOpen }
            onClose={ onClose }
            header="Update Player"
            buttonText="Update"
            successMessage="Updated player"
        >
            <Input defaultValue={ player.firstName } onChange={ e => setFirstName(e.target.value) } />
            <Input defaultValue={ player.lastName } onChange={ e => setLastName(e.target.value) }/>
            <Select defaultValue={ player.school.id } onChange={ e => setSchoolId(e.target.value) }>
                { schools.map(school =>
                    <option key={ school.id } value={ school.id }>{ school.name }</option>
                ) }
            </Select>
        </ActionModal>
    )
}
