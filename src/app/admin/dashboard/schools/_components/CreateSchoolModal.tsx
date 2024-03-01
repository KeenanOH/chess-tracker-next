import { Input } from "@chakra-ui/react"
import { useState } from "react"

import ActionModal from "@/app/_components/modals/ActionModal"
import { trpc } from "@/lib/trpc/trpc"

type CreateSchoolModalProps = {
    isOpen: boolean,
    onClose: () => void
}

export default function CreateSchoolModal({ isOpen, onClose }: CreateSchoolModalProps) {

    const createSchool = trpc.createSchool.useMutation()
    const [name, setName] = useState("")

    return (
        <ActionModal
            action={ () => createSchool.mutateAsync({ name }) }
            isOpen={ isOpen }
            onClose={ onClose }
            header="Create School"
            buttonText="Create"
            successMessage="Created school"
        >
            <Input placeholder="Name" onChange={ e => setName(e.target.value) }/>
        </ActionModal>
    )
}
