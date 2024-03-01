import { Input } from "@chakra-ui/react"
import { useState } from "react"

import ActionModal from "@/app/_components/modals/ActionModal"
import { ModalProps } from "@/app/types"
import { Player } from "@/lib/trpc/models/player"
import { trpc } from "@/lib/trpc/trpc"

export default function UpdatePlayerModal({ isOpen, onClose, player }: ModalProps & { player: Player }) {

    const updatePlayer = trpc.updatePlayer.useMutation()
    const [firstName, setFirstName] = useState(player.firstName)
    const [lastName, setLastName] = useState(player.lastName)

    return (
        <ActionModal
            action={ () => updatePlayer.mutateAsync({ id: player.id, firstName, lastName })}
            isOpen={ isOpen }
            onClose={ onClose }
            header="Update Player"
            buttonText="Update"
            successMessage="Updated player"
        >
            <Input defaultValue={ firstName } placeholder="First Name" onChange={ e => setFirstName(e.target.value) } />
            <Input defaultValue={ lastName } placeholder="Last Name" onChange={ e => setLastName(e.target.value) }/>
        </ActionModal>
    )
}
