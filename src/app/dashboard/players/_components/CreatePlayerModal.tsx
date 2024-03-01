import { Input } from "@chakra-ui/react"
import { useState } from "react"

import ActionModal from "@/app/_components/modals/ActionModal"
import { ModalProps } from "@/app/types"
import { trpc } from "@/lib/trpc/trpc"

export default function CreatePlayerModal({ isOpen, onClose }: ModalProps) {

    const createPlayer = trpc.createPlayer.useMutation()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    return (
        <ActionModal
            action={ () => createPlayer.mutateAsync({ firstName, lastName }) }
            isOpen={ isOpen }
            onClose={ onClose }
            header="Create Player"
            buttonText="Create"
            successMessage="Created Player"
        >
            <Input placeholder="First Name" onChange={ e => setFirstName(e.target.value) } />
            <Input placeholder="Last Name" onChange={ e => setLastName(e.target.value) }/>
        </ActionModal>
    )
}
